#check ──────────────────────────────────────────────
# GitHub OIDC Identity Provider
# ──────────────────────────────────────────────

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  # The thumbprint is required for OIDC providers. This is the official GitHub thumbprint.
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1", "1c58a3a8518e8759bf075b76b750d4f2df264fcd", "06d927fecd0a84aeba28aad1d808139470fe95c3"]
}

# ──────────────────────────────────────────────
# IAM Role for GitHub Actions
# ──────────────────────────────────────────────

data "aws_caller_identity" "current" {}

resource "aws_iam_role" "github_actions" {
  name = "${var.project_name}-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:Israel-dot-com*/apartment-deployment-main*"
          }
        }
      }
    ]
  })
}

# ──────────────────────────────────────────────
# Permissions for GitHub Actions (SSM & EC2 Lookup)
# ──────────────────────────────────────────────

resource "aws_iam_role_policy" "github_actions_ssm" {
  name = "${var.project_name}-github-actions-policy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # Allow looking up the EC2 instance by tag
        Effect = "Allow"
        Action = [
          "ec2:DescribeInstances"
        ]
        Resource = "*"
      },
      {
        # Allow sending commands via SSM to instances tagged with our project
        Effect = "Allow"
        Action = [
          "ssm:SendCommand"
        ]
        Resource = [
          "arn:aws:ec2:${var.aws_region}:${data.aws_caller_identity.current.account_id}:instance/*"
        ]
        Condition = {
          StringEquals = {
            "ssm:ResourceTag/Name" = "${var.project_name}-server"
          }
        }
      },
      {
        # Allow access to the SSM document
        Effect = "Allow"
        Action = [
          "ssm:SendCommand"
        ]
        Resource = [
          "arn:aws:ssm:${var.aws_region}::document/AWS-RunShellScript"
        ]
      },
      {
        # Allow checking the status of the command
        Effect = "Allow"
        Action = [
          "ssm:GetCommandInvocation"
        ]
        Resource = "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*"
      }
    ]
  })
}

# Output the Role ARN so the user can add it to GitHub Secrets
output "github_actions_role_arn" {
  description = "Add this ARN as a repository secret in GitHub named AWS_OIDC_ROLE_ARN"
  value       = aws_iam_role.github_actions.arn
}

