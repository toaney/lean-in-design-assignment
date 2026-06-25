# Lean In - Design Assignment - Thomas Toan

Full-stack app with a FastAPI backend, React (Vite) frontend, and PostgreSQL, orchestrated via Docker Compose.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Setup

1. Create your local environment file from the example and adjust values if needed:

   ```bash
   cp .env.example .env
   ```

2. Build and start all services:

   ```bash
   docker compose up --build
   ```

Once running:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- PostgreSQL: localhost:5432

## Environment Variables

Configuration is supplied via a `.env` file in the project root, which Docker Compose loads automatically. The committed `.env.example` documents the required variables with safe local defaults:

| Variable      | Description            | Default        |
| ------------- | ---------------------- | -------------- |
| `DB_USER`     | PostgreSQL username    | `dev_user`     |
| `DB_PASSWORD` | PostgreSQL password    | `dev_password` |
| `DB_NAME`     | PostgreSQL database    | `dev_db`       |

`.env` is git-ignored so real secrets are never committed. Anyone cloning the repo just copies `.env.example` to `.env` to get started.
