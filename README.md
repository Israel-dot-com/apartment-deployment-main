# Smash Apartment

A dual-service hospitality and mobility marketplace connecting guests and travelers with **short-let apartment stays** and **car rentals**. Vendors list properties and vehicles, complete identity verification (KYC), and manage bookings — while platform admins moderate listings, verify vendors, and track analytics.

## Features

- **Property Listings** — Furnished short-let rentals with photo/video galleries, amenities, guest capacities, and host payout configuration
- **Car Rentals** — Vehicle hire (sedan, SUV, van) with pickup locations, passenger configs, and automated VAT calculation
- **Multi-Role RBAC** — Dedicated permissions for customers (`user`), verified hosts/fleet owners (`vendor`), and platform moderators (`superadmin`)
- **Vendor KYC** — ID document upload and admin review before listings can go live
- **Admin Dashboard** — Platform analytics, user management, listing moderation with approval workflows, and support ticket management
- **Support Ticketing** — Native customer care ticket submission and tracking

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 6, React Router v7, TanStack Query, Tailwind CSS, Framer Motion |
| **Backend** | Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.0 (async), Alembic |
| **Database** | PostgreSQL 17 |
| **Infrastructure** | Docker Compose, Nginx reverse proxy, Terraform (AWS VPC + ALB + EC2) |

### Integrations

- **Media Storage** — Cloudinary, MinIO
- **Auth** — JWT (access/refresh rotation), Google OAuth 2.0
- **Maps** — Google Maps API
- **Payments** — Flutterwave, Stripe
- **Communications** — Twilio SMS, SMTP email

## Architecture

```
┌──────────┐     ┌───────────────┐     ┌──────────────┐     ┌────────────┐
│  Browser  │────▶│  Nginx (:80)  │────▶│  Frontend    │     │            │
│           │     │               │     │  React/Vite  │     │  Postgres  │
│           │     │  /api/* ──────│────▶│  Backend     │────▶│  17-alpine │
└──────────┘     └───────────────┘     │  FastAPI     │     │            │
                                       └──────────────┘     └────────────┘
```

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### 1. Clone and configure

```bash
git clone <repo-url>
cd apartment-deployment
```

Create the root `.env`:

```env
DB_NAME=apartment
DB_USER=apartment
DB_PASSWORD=your-secure-password
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=600
JWT_REFRESH_EXPIRY=30
APP_URL=http://localhost
FRONTEND_URL=http://localhost
```

Create `be-apartment/.env` with your backend config (see `be-apartment/.env.sample` for all options). At minimum, set:

```env
DB_URL=postgresql://apartment:your-secure-password@postgres:5432/apartment
SECRET_KEY=your-secret-key
```

### 2. Run

```bash
docker compose up -d --build
```

### 3. Access

| Service | URL |
|---------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost/api/v1 |

## Deployment (AWS)

Terraform configuration is included in `terraform/` for deploying to AWS with:

- Custom VPC with public/private subnets across 2 AZs
- Application Load Balancer with optional ACM SSL
- EC2 instance in a private subnet
- NAT Gateway for outbound access

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars
terraform init
terraform apply
```

See `terraform/terraform.tfvars.example` for configuration options.

## Project Structure

```
apartment-deployment/
├── be-apartment/          # FastAPI backend
│   ├── api/               # Routes, models, schemas, services
│   ├── alembic/           # Database migrations
│   ├── Dockerfile
│   └── entrypoint.sh      # Runs migrations then starts Uvicorn
├── fe-apartment/          # React frontend
│   ├── src/
│   └── Dockerfile         # Multi-stage build → Nginx
├── nginx/                 # Reverse proxy config
├── terraform/             # AWS infrastructure (VPC, ALB, EC2)
├── docker-compose.yml
└── .env                   # Root env (DB credentials for Postgres)
```

## License

See [LICENSE](be-apartment/LICENSE) for details.
