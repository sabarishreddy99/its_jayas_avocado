# Dev-only image, used by `docker compose -f infra/compose.yml up`.
#
# Production never builds from this file: the frontend ships as a Next.js static
# export (`output: "export"`) built in GitHub Actions and served by GitHub Pages
# (apex) and nginx on Lightsail (gradevitian./vrfbricks. subdomains).
#
# Build context is `frontend/` — same as the paths below.
FROM node:20-slim

WORKDIR /app

# Copy manifests first so `npm ci` is cached independently of source changes.
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
