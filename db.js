'use strict';

const mongodb = require('mongodb');

const configs = {
    user: 'username',
    password: 'password',
    url: 'localhost/',
    db: 'database'
};

const conn = {
    db: null
};

exports.connect = (cb) => {
    mongodb.connect('mongodb://' + configs.user + ':' + configs.password + '@' + configs.url + configs.db, (err, db) => {
        if (err) {
            cb(err);
        } else {
            conn.db = db;
            cb();
        }
    });
};

exports.opSTACollection = () => {
    return conn.db.collection('op_sta');
};

exports.errosCollection = () => {
    return conn.db.collection('erros');
};
