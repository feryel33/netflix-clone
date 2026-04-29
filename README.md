# 🎬 Netflix Clone — DevOps Pipeline

Full-stack Netflix clone with a complete end-to-end DevOps pipeline.

## 🏗️ Architecture
netflix-clone/
├── frontend/          # React + Vite
├── backend/           # Node.js + Express
├── k8s/               # Kubernetes manifests
├── .github/workflows/ # CI/CD pipeline
└── docker-compose.yml

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, TailwindCSS |
| Backend | Node.js, Express, MongoDB |
| Auth | JWT |
| External API | TMDB API |
| Containerization | Docker, Docker Compose |
| Orchestration | Kubernetes (Minikube) |
| GitOps | ArgoCD |
| CI/CD | GitHub Actions |
| Code Quality | SonarCloud |
| Security | Trivy |
| Monitoring | Prometheus + Grafana |

## 🚀 DevOps Pipeline
Code → GitHub → CI Pipeline → Docker Build → Trivy Scan → SonarCloud → Kubernetes → ArgoCD → Monitoring

### CI Pipeline (GitHub Actions)
- ✅ Install dependencies
- ✅ Build frontend
- ✅ Build Docker images
- ✅ Trivy security scan
- ✅ SonarCloud code analysis

### CD Pipeline (ArgoCD)
- ✅ GitOps with ArgoCD
- ✅ Auto-sync from `k8s/` folder
- ✅ Self-healing deployments

## 🔧 Run Locally

### Without Docker
```bash
# Backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### With Docker
```bash
docker-compose up --build
```

- Frontend → http://localhost:3000
- Backend → http://localhost:5000

## ☸️ Kubernetes Deployment

```bash
# Start Minikube
minikube start --driver=docker --memory=2048

# Build images
eval $(minikube docker-env)
docker build -f Dockerfile.backend -t netflix-backend:latest .
docker build -t netflix-frontend:latest ./frontend

# Deploy
kubectl apply -f k8s/
kubectl get pods
```

## 📊 Monitoring

```bash
# Access Grafana
kubectl --namespace monitoring port-forward svc/prometheus-grafana 3001:80
```

Open http://localhost:3001 — admin / admin123

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
TMDB_API_KEY=your_key
NODE_ENV=development
```

## 📁 Project Structure

| Folder | Description |
|---|---|
| `frontend/` | React application |
| `backend/` | Express API |
| `k8s/` | Kubernetes manifests |
| `.github/workflows/` | CI/CD pipelines |

