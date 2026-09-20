# ──────────────────────────────────────────────
# CloudWatch Log Group for Docker Containers
# ──────────────────────────────────────────────

resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "/docker/${var.project_name}"
  retention_in_days = 14

  tags = { Name = "${var.project_name}-logs" }
}

# ──────────────────────────────────────────────
# CloudWatch Alarms
# ──────────────────────────────────────────────

# High CPU Alarm for EC2
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "${var.project_name}-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors EC2 CPU utilization"

  dimensions = {
    InstanceId = aws_instance.app.id
  }
}

# 5XX Errors Alarm for ALB
resource "aws_cloudwatch_metric_alarm" "alb_5xx_errors" {
  alarm_name          = "${var.project_name}-alb-5xx"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = "60"
  statistic           = "Sum"
  threshold           = "5"
  alarm_description   = "Triggers if the backend returns too many 500-level errors"

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }
}
