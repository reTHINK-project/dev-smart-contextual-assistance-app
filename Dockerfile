FROM node:carbon
LABEL maintainer=vitor-t-silva@telecom.pt

RUN apt-get update && apt-get install -y vim apache2 && apt-get clean

RUN a2enmod rewrite
RUN a2enmod ssl

RUN mkdir -p /rethink/

# Change the work directory
WORKDIR /rethink/

ADD . /rethink/

ENV PATH=/rethink/node_modules/.bin:$PATH

# Install app dependencies
# RUN npm install && npm run build

WORKDIR /var/www/

# RUN mkdir -p ./dev-smart-contextual-assistance-app/

RUN ln -s /rethink/dist/* /var/www/

RUN pwd && ls -als

# Copy site into place.
ADD docker/hosts /etc/hosts
ADD docker/apache2.conf /etc/apache2/apache2.conf
ADD docker/.htaccess .

# Update the default apache site with the config we created.
ADD docker/default.conf /etc/apache2/sites-available/smart-contextual-assistance-app.conf

RUN a2dissite 000-default.conf
RUN a2ensite smart-contextual-assistance-app.conf

RUN chmod -R 755 .

RUN ls -als

WORKDIR /var/www/

RUN ls -als

# By default, simply start apache.
CMD /usr/sbin/apache2ctl -D FOREGROUND

# Expose HTTP Port
EXPOSE 443
EXPOSE 8080
