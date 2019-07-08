FROM node:10
WORKDIR /api
COPY ./package*.json ./
RUN npm install --only=production
COPY . .
ARG PORT=80
EXPOSE $PORT
ENV PORT $PORT
ENV SECRET secret
ENV NODE_ENV production
CMD [ "npm", "start" ]
