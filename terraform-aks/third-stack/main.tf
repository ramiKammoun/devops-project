data "terraform_remote_state" "aks" {
  backend = "azurerm" 
  config = {
    resource_group_name  = "RG-AKS"
    storage_account_name = "studentslist"
    container_name       = "infra-state"
    key                  = "first-stack.tfstate"
  }
}

locals {
  kube_config            = data.terraform_remote_state.aks.outputs.kube_config.0
  host                   = local.kube_config.host
  username               = local.kube_config.username
  password               = local.kube_config.password
  client_certificate     = base64decode(local.kube_config.client_certificate)
  client_key             = base64decode(local.kube_config.client_key)
  cluster_ca_certificate = base64decode(local.kube_config.cluster_ca_certificate)
}

provider "kubernetes" {
  host                   = local.host
  username               = local.username
  password               = local.password
  client_certificate     = local.client_certificate
  client_key             = local.client_key
  cluster_ca_certificate = local.cluster_ca_certificate
}

provider "helm" {
  debug                  = true
  repository_config_path = "${path.module}/.helm/repositories.yaml"
  repository_cache       = "${path.module}/.helm"
  kubernetes {
    host                   = local.host
    username               = local.username
    password               = local.password
    client_certificate     = local.client_certificate
    client_key             = local.client_key
    cluster_ca_certificate = local.cluster_ca_certificate
  }

}

resource "helm_release" "ingress_nginx" {
  name = "ingress-nginx"
  chart = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  
  set {
    name = "service\\.beta\\.kubernetes\\.io/azure-load-balancer-health-probe-request-path"
    value = "/healthz"
    type = "string"
  }
}