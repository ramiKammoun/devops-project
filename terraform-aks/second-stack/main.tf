data "terraform_remote_state" "aks" {
  backend = "azurerm"

  config = {

    resource_group_name  = "RG-AKS"
    storage_account_name = "studentslist"
    container_name       = "infra-state"
    key                  = "first-stack.tfstate"
  }
}


resource "kubernetes_namespace" "example" {
  metadata {
    annotations = {
      name = "example-annotation"
    }

    name = "monitoring"
  }
}

resource "helm_release" "my_application" {
  name = var.release_name
  chart = var.chart
}

// resource "helm_release" "example" {
//   name       = "argocdproj"
//   repository = "https://argoproj.github.io/argo-helm"
//   chart      = "argo-cd"
//   namespace  = kubernetes_namespace.example.id
//   verify = false
// }