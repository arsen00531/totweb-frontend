#Stage 1
FROM node:22.11.0 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx:1.25.5
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]