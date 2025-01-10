# SocialHub Cloud

A cloud-native social networking application deployed using Kubernetes and Docker.

## Prerequisites

- Docker
- Kubernetes cluster (e.g., minikube, k3s)
- kubectl
- sudo privileges

## System Architecture

The application consists of three main components:
- Frontend (Node.js)
- Backend (Spring Boot)
- MySQL Database

## Setup Instructions

### 1. Set up Local Registry

```bash
sudo docker run -d -p 32000:5000 --restart=always --name registry registry:2
```

### 2. Build and Push Docker Images

```bash
# Build images
sudo docker build -t localhost:32000/socialhub-backend:latest -f Dockerfile.backend .
sudo docker build -t localhost:32000/socialhub-frontend:latest -f Dockerfile.frontend .

# Push to local registry
sudo docker push localhost:32000/socialhub-backend:latest
sudo docker push localhost:32000/socialhub-frontend:latest
```

### 3. Create and Configure Kubernetes Namespace

```bash
sudo kubectl create namespace socialhub
sudo kubectl config set-context --current --namespace=socialhub
```

### 4. Deploy Application Components

Deploy in the following order:

```bash
# 1. Create MySQL secrets
sudo kubectl apply -f k8s/mysql-secret.yaml

# 2. Set up MySQL storage
sudo kubectl apply -f k8s/mysql-pv-pvc.yaml

# 3. Deploy MySQL
sudo kubectl apply -f k8s/mysql-deployment.yaml

# 4. Wait for MySQL to be ready
sudo kubectl wait --for=condition=ready pod -l app=mysql

# 5. Deploy frontend
sudo kubectl apply -f k8s/frontend-deployment.yaml

# 6. Deploy backend
sudo kubectl apply -f k8s/backend-deployment.yaml
```

### 5. Verify Deployment

```bash
sudo kubectl get pods
```

## Accessing the Application

Open two terminal windows and run:

```bash
# Terminal 1 - Backend
sudo kubectl port-forward svc/backend 8080:8080

# Terminal 2 - Frontend
sudo kubectl port-forward svc/frontend 5500:5500
```

Access the application at:
- Frontend: http://localhost:5500
- Backend API: http://localhost:8080

## Service Ports

- Frontend: 5500
- Backend: 8080
- MySQL: 3306
- Local Registry: 32000

## Troubleshooting

If pods are not starting, check their status with:
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```
