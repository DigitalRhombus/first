variable "aws_region" {
  description = "AWS region where resources will be provisioned"
  default     = "ca-central-1"  # Updated to Canada Central
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  default     = "ami-0b59bfac6be064b78"  # Example AMI for ca-central-1 (Amazon Linux 2)
}

variable "instance_type" {
  description = "Instance type for the EC2 instance"
  default     = "t2.large"
}
