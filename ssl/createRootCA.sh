#!/usr/bin/env bash
mkdir rootCA
openssl genrsa -des3 -out ./rootCA/rootCA.key 2048
openssl req -x509 -new -nodes -key ./rootCA/rootCA.key -sha256 -days 1024 -out ./rootCA/rootCA.pem
