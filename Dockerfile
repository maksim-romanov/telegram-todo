FROM oven/bun:slim as base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production --ignore-scripts

FROM base AS build
COPY --from=install /temp/prod/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun build:production

FROM base AS release
COPY --from=build /usr/src/app/build build
RUN mkdir db && chmod a+rw ./db*
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "build/index.js" ]
