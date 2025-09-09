#!/bin/bash
set -e
mkdir -p certs
# CA
openssl genrsa -out certs/ca-key.pem 2048
openssl req -x509 -new -nodes -key certs/ca-key.pem -subj "/CN=CertToCert CA" -days 3650 -out certs/ca-cert.pem
# Server
openssl genrsa -out certs/server-key.pem 2048
openssl req -new -key certs/server-key.pem -subj "/CN=localhost" -out certs/server.csr
openssl x509 -req -in certs/server.csr -CA certs/ca-cert.pem -CAkey certs/ca-key.pem -CAcreateserial -out certs/server-cert.pem -days 3650
# Client
openssl genrsa -out certs/client-key.pem 2048
openssl req -new -key certs/client-key.pem -subj "/CN=client" -out certs/client.csr
openssl x509 -req -in certs/client.csr -CA certs/ca-cert.pem -CAkey certs/ca-key.pem -CAcreateserial -out certs/client-cert.pem -days 3650
# Clean up
rm certs/server.csr certs/client.csr certs/ca-cert.srl
