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
    email_address = "fischer012005@yahoo.fr"
  }
}

resource "azurerm_monitor_metric_alert" "http_5xx_alert" {
  name                = "alert-http-5xx"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_linux_web_app.app.id]
  description         = "Alerte erreurs HTTP 5xx sur Web App"

  severity    = 2
  window_size = "PT5M"
  frequency   = "PT1M"

  criteria {
    metric_namespace = "Microsoft.Web/sites"
    metric_name      = "Http5xx"
    aggregation      = "Total"
    operator         = "GreaterThan"
    threshold        = 5
  }

  action {
    action_group_id = azurerm_monitor_action_group.ag.id
  }
}





































