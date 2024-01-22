FROM node:20-slim AS builder

COPY . /build

FROM node:20-alpine

RUN apk add git
RUN mkdir -p /app/config
RUN mkdir -p /app/public

COPY --from=builder /build/api /app/api
COPY --from=builder /build/config/index.js /app/config/index.js
COPY --from=builder /build/config/production.js /app/config/production.js
COPY --from=builder /build/config/default-0.json /app/config/default-0.json
COPY --from=builder /build/services /app/services
COPY --from=builder /build/views /app/views
COPY --from=builder /build/server.js /app/server.js
COPY --from=builder /build/ecosystem.config.js /app/ecosystem.config.js
COPY --from=builder /build/package.json /app/package.json
COPY --from=builder /build/package-lock.json /app/package-lock.json
COPY --from=builder /build/.bowerrc /app/.bowerrc
COPY --from=builder /build/bower.json /app/bower.json
COPY --from=builder /build/docker/backend/conf/entrypoint.sh /root/host/init.sh

WORKDIR /app

RUN npm ci --only=prod
RUN npx bower install --allow-root
RUN npm i -g pm2


ENTRYPOINT ["sh", "/root/host/init.sh"]
