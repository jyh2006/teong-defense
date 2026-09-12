FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json server.mjs calculations.mjs ./
COPY public ./public
RUN mkdir -p /app/data && chown -R node:node /app
USER node
ENV NODE_ENV=production
ENV DATA_DIR=/app/data
ENV PORT=3000
EXPOSE 3000
CMD ["node","server.mjs"]
