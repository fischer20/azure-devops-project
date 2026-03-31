resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-devops-project"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}
resource "azurerm_application_insights" "appi" {
  name                = "appi-devops-project"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  workspace_id        = azurerm_log_analytics_workspace.law.id
  application_type    = "web"
}
resource "azurerm_monitor_action_group" "ag" {
  name                = "ag-devops-alerts"
  resource_group_name = azurerm_resource_group.rg.name
  short_name          = "devopsag"
  email_receiver {
    name          = "admin-email"
    email_address = "ton-email@example.com"
  }
}
resource "azurerm_monitor_metric_alert" "cpu_alert" {
  name                = "alert-high-cpu"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_linux_web_app.app.id]
  description         = "Alerte CPU élevée sur Web App"
  severity            = 2

