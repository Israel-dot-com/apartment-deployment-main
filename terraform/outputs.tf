# ──────────────────────────────────────────────
# Networking
# ──────────────────────────────────────────────

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

# ──────────────────────────────────────────────
# ALB
# ──────────────────────────────────────────────

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "app_url" {
  description = "URL to access the application"
  value       = var.domain_name != "" ? "https://${var.domain_name}" : "http://${aws_lb.main.dns_name}"
}

# ──────────────────────────────────────────────
# EC2
# ──────────────────────────────────────────────

output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.app.id
}

output "ec2_private_ip" {
  description = "Private IP of the EC2 instance"
  value       = aws_instance.app.private_ip
}

output "ssh_command" {
  description = "Command to SSH into the EC2 instance via Instance Connect"
  value       = "aws ec2-instance-connect ssh --instance-id ${aws_instance.app.id} --os-user ubuntu"
}

# ──────────────────────────────────────────────
# ACM (if domain provided)
# ──────────────────────────────────────────────

output "acm_validation_records" {
  description = "DNS records to add for ACM certificate validation (if domain is set)"
  value = var.domain_name != "" ? {
    for dvo in aws_acm_certificate.main[0].domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  } : {}
}
