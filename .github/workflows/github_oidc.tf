# ──────────────────────────────────────────────
# GitHub OIDC Identity Provider
# ──────────────────────────────────────────────

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1",
                     "1c58a3a8518e8759bf075b76b750d4f2df264fcd"]
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
            "token.actions.githubusercontent.com:sub" = "repo:israel-dot-com/apartment-deployment:*"
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
        Effect   = "Allow"
        Action   = ["ec2:DescribeInstances"]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = ["ssm:SendCommand"]
        Resource = [
          "arn:aws:ec2:${var.aws_region}:${data.aws_caller_identity.current.account_id}:instance/*",
          "arn:aws:ssm:${var.aws_region}:*:document/AWS-RunShellScript"
        ]
        Condition = {
          StringEquals = {
            "ssm:ResourceTag/Name" = "${var.project_name}-server"
          }
        }
      },
      {
        Effect   = "Allow"
        Action   = ["ssm:GetCommandInvocation"]
        Resource = "arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*"
      }
    ]
  })
}

# Output the Role ARN
output "github_actions_role_arn" {
  description = "Add this ARN as a GitHub repository secret named AWS_OIDC_ROLE_ARN"
  value       = aws_iam_role.github_actions.arn
}
