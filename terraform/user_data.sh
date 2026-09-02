#!/bin/bash
set -euo pipefail

exec > /var/log/user-data.log 2>&1
echo ">>> User data script started at $(date)"

# ──────────────────────────────────────────────
# 1. System updates
# ──────────────────────────────────────────────
apt-get update -y
apt-get upgrade -y

# ──────────────────────────────────────────────
# 2. Install Docker
# ──────────────────────────────────────────────
curl -fsSL https://get.docker.com | sh
usermod -aG docker ubuntu

# ──────────────────────────────────────────────
# 3. Install Git
# ──────────────────────────────────────────────
apt-get install -y git

# ──────────────────────────────────────────────
# 4. Clone application repository
# ──────────────────────────────────────────────
APP_DIR="/home/ubuntu/apartment-deployment"

%{ if app_repo_url != "" ~}
sudo -u ubuntu git clone "${app_repo_url}" "$APP_DIR"
%{ else ~}
echo ">>> No app_repo_url provided — skipping clone."
echo ">>> You will need to manually copy the application to $APP_DIR"
sudo -u ubuntu mkdir -p "$APP_DIR"
%{ endif ~}

# ──────────────────────────────────────────────
# 5. Set ownership and placeholder for .env files
# ──────────────────────────────────────────────
chown -R ubuntu:ubuntu "$APP_DIR"

echo ">>> User data script completed at $(date)"
echo ">>> Next steps:"
echo ">>>   1. SSH in and configure .env files"
echo ">>>   2. Run: cd $APP_DIR && docker compose up -d --build"
