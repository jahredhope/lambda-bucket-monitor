var bucketMonitor = require('./index.js').handler;
console.log(bucketMonitor);
bucketMonitor('event', 'context');
