#!/bin/bash

# Usuń zasoby Kubernetes
kubectl delete -f k8s/
kubectl delete namespace socialhub || true
kubectl wait --for=delete namespace/socialhub || true

# Usuń stary rejestr i obrazy
docker stop registry || true
docker rm registry || true
docker rmi localhost:32000/socialhub-backend:latest || true
docker rmi localhost:32000/socialhub-frontend:latest || true

# Uruchom nowy rejestr
docker run -d -p 32000:5000 --restart=always --name registry registry:2

# Zbuduj i wypchnij nowe obrazy
docker build -t localhost:32000/socialhub-backend:latest -f Dockerfile.backend .
docker build -t localhost:32000/socialhub-frontend:latest -f Dockerfile.frontend .
docker push localhost:32000/socialhub-backend:latest
docker push localhost:32000/socialhub-frontend:latest

# Utwórz nowe zasoby Kubernetes
kubectl create namespace socialhub
kubectl config set-context --current --namespace=socialhub
kubectl apply -f k8s/mysql-secret.yaml
kubectl apply -f k8s/mysql-pv-pvc.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl wait --for=condition=ready pod -l app=mysql  # Poczekaj na uruchomienie MySQL
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

echo "Rebuild completed. Checking status..."
kubectl get all

# Uruchom port-forwarding w tle
kubectl port-forward svc/backend 8080:8080 &
kubectl port-forward svc/frontend 5500:5500 &

# Zapisz PID-y procesów port-forward
echo $! > frontend-port-forward.pid
echo $! > backend-port-forward.pid

echo "Port forwarding uruchomiony w tle."
echo "Aby zatrzymać port-forwarding, użyj: ./stop-forwarding.sh"
