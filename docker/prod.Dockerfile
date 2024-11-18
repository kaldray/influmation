FROM node:20.18-alpine3.19 AS base

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY . .

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 3333
CMD ["node", "./bin/server.js"]
