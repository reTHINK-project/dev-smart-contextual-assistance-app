FROM node:carbon
LABEL maintainer=vitor-t-silva@telecom.pt

RUN apt-get update && apt-get install -y vim

RUN mkdir -p /rethink/

# Change the work directory
WORKDIR /rethink/

ENV PATH=/rethink/node_modules/.bin:$PATH

# Copy all
COPY . /rethink/

RUN pwd && ls -als

# Install app dependencies
RUN npm install -g http-server && npm install && npm run build

# Start the gulp server task
ENTRYPOINT http-server ./dist -p 8080

# Expose HTTPS Port
EXPOSE 443
EXPOSE 8080
