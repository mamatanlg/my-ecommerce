FROM node:24

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
# Set after the install and build steps, which need the dev dependencies.
ENV NODE_ENV=production
