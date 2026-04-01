#!/bin/bash

echo "Starting Service Registry..."
cd service-registry
mvn spring-boot:run &
sleep 20

echo "Starting API Gateway..."
cd ../api-gateway
mvn spring-boot:run &
sleep 15

echo "Starting User Service..."
cd ../user-service
mvn spring-boot:run &
sleep 10

echo "Starting Product Service..."
cd ../product-service
mvn spring-boot:run &
sleep 10

echo "Starting React Frontend..."
cd ../frontend
npm install
npm start &

echo "All services started!"
echo "Eureka Dashboard: http://localhost:8761"
echo "API Gateway: http://localhost:8080"
echo "React App: http://localhost:3000"