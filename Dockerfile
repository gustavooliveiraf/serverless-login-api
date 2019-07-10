FROM node:10
WORKDIR /api
COPY ./package*.json ./
RUN npm install --only=production
COPY . .
ARG PORT=8000
ENV PORT $PORT
ENV SECRET secret
ENV NODE_ENV production
ENV BUCKET_NAME store-gustavo
ENV BUCKET_API http://54.173.27.60:8001
EXPOSE $PORT
CMD [ "npm", "start" ]
