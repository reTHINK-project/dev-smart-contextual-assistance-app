FROM node
MAINTAINER vitor-t-silva@telecom.pt

RUN mkdir -p /rethink

# Change the work directory
WORKDIR /rethink

ENV PATH=/rethink/node_modules/.bin:$PATH

# Copy package.json
COPY package.json /rethink/

# Install app dependencies
RUN npm install

# Copy all structure
COPY . /rethink/

# Start the gulp server task
ENTRYPOINT npm run server

# Expose HTTPS Port
EXPOSE 443
