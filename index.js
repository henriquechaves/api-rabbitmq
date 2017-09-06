'use sctrict';

const db = require('./db');
const async = require('async');
const rabbitmq = require('./rabbitmq');
const numCPUs = Math.max(require('os').cpus().length - 1, 1);

async.series([db.connect, rabbitmq.connect, rabbitmq.register], (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log('Ready!');
    }
});