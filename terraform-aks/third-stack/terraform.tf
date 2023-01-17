provider "azurerm" {
  features {}
}

terraform {
  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "~>2.8.0"

    }
  }
   backend "azurerm" {
    resource_group_name = "RG-AKS"
    storage_account_name = "studentslist"
    container_name = "infra-state"
    key = "ingress.terraform.tfstate"
  }
}