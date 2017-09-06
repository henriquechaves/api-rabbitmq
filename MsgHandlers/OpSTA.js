'use strict';

const db = require('../db');
const zlib = require('zlib');

module.exports = (msg) => {
    zlib.gunzip(msg.content, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            let obj = JSON.parse(result.toString('utf8'));
            db.opSTACollection().insertOne(obj, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    if (obj.security_key_user) {
                        console.log('[' + obj.date + '] [' + obj.security_key_user + '] @ [client:' + obj.client + '] -> ' + obj.operation);
                    } else {
                        console.log('[' + obj.date + '] [' + obj.os_user + '] @ [' + obj.machine_name + '] -> ' + obj.operation);
                    }
                }
            });
        }
    });
};