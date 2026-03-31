provider "azurerm" {
  features {}
}
resource "azurerm_resource_group" "rg" {
  name     = "rg-devops-project"
  location = var.location
}
resource "azurerm_service_plan" "plan" {
  name                = "asp-devops-project"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}
resource "azurerm_linux_web_app" "app" {
  name                = "devops-azure-app-fischer"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.plan.id
  site_config {
    application_stack {
      node_version = "18-lts"
    }
    health_check_path = "/health"
  }
  app_settings = {
    "WEBSITES_PORT"                 = "3000"

