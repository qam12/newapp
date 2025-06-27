# Use an official Node image
FROM node:18-alpine as build

# Set build-time variables
ARG REACT_APP_NEWS_API_KEY
ARG REACT_APP_GUARDIAN_API_KEY
ARG REACT_APP_NYT_API_KEY

ENV REACT_APP_NEWS_API_KEY=$REACT_APP_NEWS_API_KEY
ENV REACT_APP_GUARDIAN_API_KEY=$REACT_APP_GUARDIAN_API_KEY
ENV REACT_APP_NYT_API_KEY=$REACT_APP_NYT_API_KEY

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Inject variables at build time
RUN npm run build

FROM node:18-alpine as production
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
