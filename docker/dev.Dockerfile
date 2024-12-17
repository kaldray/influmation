FROM node:20.18-alpine3.19

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /usr/src/app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* panda.config.ts ./

RUN corepack enable pnpm && pnpm i

RUN pnpm config set store-dir /pnpm/store/v3

COPY . .

CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  elif [ -f package-lock.json ]; then npm run dev; \
  elif [ -f pnpm-lock.yaml ]; then pnpm dev; \
  else npm run dev; \
  fi
