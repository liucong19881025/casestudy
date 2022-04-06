# specify base image
FROM node:16
WORKDIR /usr/app

# install dep

COPY ./package.json ./
RUN npm install --force

# default command

COPY ./ ./
CMD ["npm", "start"]
