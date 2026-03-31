const express = require('express');
const appInsights = require('applicationinsights');
if (process.env.APPINSIGHTS_CONNECTION_STRING) {
  appInsights.setup(process.env.APPINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .start();
}
const client = appInsights.defaultClient;
const app = express();
app.listen(PORT, () => {
apconsole.log(`Server running on port ${PORT}`);});
});.use((err, req, res, next) => {).toISOString()}] ${req.method} ${req.url}`;
  console.error(err.message);
  res.send('Hello from DevOps Azure Project with Monitoring 🚀');
})if (client) {
    client.trackException({ exception: err });
ap}.get('/health', (req, res) => {
  res.status(200).json({
  res.status(500).json({
  } error: 'Internal Server Error',ng()
  })message: err.message
})});t();
});
app.get('/error-test', (req, res) => {
const PORT = process.env.PORT || 3000;ication Insights');


