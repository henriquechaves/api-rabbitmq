'use strict';

const amqp = require('amqplib/callback_api');

const configs = {
    url: 'localhost',
    user: 'username',
    password: 'password',
    exchange: 'exchange',
    queues: {
        op_sta: 'exchange.op_sta',
        errors: 'exchange.erros'
    }
}

const data = {
    conn: null
};

exports.connect = (cb) => {
    amqp.connect('amqps://' + configs.user + ':' + configs.password + '@' + configs.url, (err, conn) => {
        if (err) {
            cb(err);
        } else {
            data.conn = conn;
            cb();
        }
    });
};

exports.register = (cb) => {
    data.conn.createChannel((err, ch) => {
        if (err) {
            cb(err);
        } else {
            ch.consume(configs.queues.op_sta, require('./MsgHandlers/OpSTA'), { noAck: true });
            ch.consume(configs.queues.errors, require('./MsgHandlers/Erro'), { noAck: true });
            cb();
        }
    });
};

exports.get = () => {
    return data.conn;
};
