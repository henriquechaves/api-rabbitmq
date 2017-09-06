'use strict';

const db = require('../db');
const zlib = require('zlib');

module.exports = (msg) => {
    zlib.gunzip(msg.content, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            let obj = JSON.parse(result.toString('utf8'));
            db.errosCollection().insertOne(obj, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('[Erro:' + obj.codigo_erro + '] @ [Cliente:' + obj.codigo_cliente + ']');
                }
            });
        }
    });
};
