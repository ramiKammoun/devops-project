const client = require('prom-client');

const register = new client.Registry();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
    name: 'requests_total',
    help: '\n The total number of requests handled by the server',
    labelNames: ['method','route','status_code','many']
});

const total_Students = new client.Gauge({
    name: 'total_students',
    help: '\n Total number of students',
  });

const total_senior_students = new client.Gauge({
    name: 'total_senior_students',
    help: '\n Total number of senior students',
  });

module.exports = {requestCounter}