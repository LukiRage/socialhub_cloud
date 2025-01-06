#!/bin/bash

docker run -d -p 32000:5000 --restart=always --name registry registry:2

# Budowanie obrazów
docker build -t localhost:32000/socialhub-backend:latest -f Dockerfile.backend .
docker build -t localhost:32000/socialhub-frontend:latest -f Dockerfile.frontend .

# Wypychanie obrazów do lokalnego rejestru
docker push localhost:32000/socialhub-backend:latest
docker push localhost:32000/socialhub-frontend:latest

kubectl create namespace socialhub
kubectl config set-context --current --namespace=socialhub

# Najpierw sekrety
kubectl apply -f k8s/mysql-secret.yaml

# Następnie persistent volume i claim dla MySQL
kubectl apply -f k8s/mysql-pv-pvc.yaml

# Uruchom bazę danych MySQL
kubectl apply -f k8s/mysql-deployment.yaml

# Poczekaj aż MySQL będzie gotowy (około 30-60 sekund)
kubectl wait --for=condition=ready pod -l app=mysql

# Uruchom frontend
kubectl apply -f k8s/frontend-deployment.yaml

# Na końcu uruchom backend
kubectl apply -f k8s/backend-deployment.yaml

# Sprawdź status wszystkich podów
kubectl get pods

# Uruchom port-forwarding w tle
kubectl port-forward svc/backend 8080:8080 &
kubectl port-forward svc/frontend 5500:5500 &

# Zapisz PID-y procesów port-forward
echo $! > frontend-port-forward.pid
echo $! > backend-port-forward.pid

echo "Port forwarding uruchomiony w tle."
echo "Aby zatrzymać port-forwarding, użyj: ./stop-forwarding.sh"