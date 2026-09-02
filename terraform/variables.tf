# ──────────────────────────────────────────────
# General
# ──────────────────────────────────────────────

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (e.g. dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "project_name" {
  description = "Project name used as prefix for all resources"
  type        = string
  default     = "apartment"
}

# ──────────────────────────────────────────────
# Networking
# ──────────────────────────────────────────────

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets (one per AZ)"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets (one per AZ)"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.20.0/24"]
}

variable "availability_zones" {
  description = "Availability zones to use"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

# ──────────────────────────────────────────────
# EC2
# ──────────────────────────────────────────────

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "key_pair_name" {
  description = "Name of an existing EC2 key pair for SSH access"
  type        = string
}

variable "ssh_allowed_cidr" {
  description = "CIDR block allowed to SSH into the EC2 instance (your IP)"
  type        = string
  default     = "0.0.0.0/0"
}

# ──────────────────────────────────────────────
# Application
# ──────────────────────────────────────────────

variable "app_repo_url" {
  description = "Git repository URL to clone onto the EC2 instance"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Domain name for the ALB HTTPS listener (leave empty to skip ACM/HTTPS)"
  type        = string
  default     = ""
}
