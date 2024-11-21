FROM node:20.18-alpine3.19 AS base
RUN corepack enable pnpm

# All deps stage
FROM base AS deps
WORKDIR /app
COPY . .
RUN pnpm i



# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/styled-system /app/styled-system
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 3333
CMD ["node", "./bin/server.js"]
