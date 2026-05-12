#!/bin/bash
# Generate a self-signed certificate and key for the frontend
SSL_DIR="nginx/ssl"
mkdir -p "$SSL_DIR"

echo "🌐 Generating Frontend SSL Certificates..."
openssl req -x509 -newkey rsa:2048 -nodes -keyout "$SSL_DIR/key.pem" -out "$SSL_DIR/cert.pem" -days 3650 \
  -subj "/C=ET/ST=AA/L=AddisAbaba/O=EMS/OU=Frontend/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

echo "✅ Frontend Certificates created at $SSL_DIR/"
