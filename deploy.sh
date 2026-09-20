#!/bin/bash
set -euo pipefail

echo "========================================="
echo "Starting deployment at $(date)"
echo "========================================="

# Navigate to the project directory
PROJECT_DIR="/home/ubuntu/apartment-deployment"
if [ ! -d "$PROJECT_DIR" ]; then
  echo "Error: Project directory $PROJECT_DIR does not exist."
  exit 1
fi
cd "$PROJECT_DIR"

# Ensure deploy.sh is executable for next time
chmod +x deploy.sh

# Pull the latest code
echo "--> Pulling latest code from main branch..."
# Using git pull directly assumes origin is set up and auth is not an issue
git fetch origin main
git checkout main
git reset --hard origin/main

# Build and start the containers
echo "--> Rebuilding and starting Docker containers..."
docker compose build
docker compose up -d

# Clean up dangling images to free up space
echo "--> Cleaning up unused Docker images..."
docker image prune -f

echo "========================================="
echo "Deployment completed successfully at $(date)"
echo "========================================="
