var mailer = require('./mailer')
var sender

exports.initialize = function (type, options, callback) {
    if (!type || !options || typeof options != 'object') {
        throw new Error('invalid parameters')
    }
    if (type === 'email') {
        sender = mailer
        sender.init(options.smtpConfig, options.from, options.to, callback)
    }
}

exports.send = function (options, callback) {
    mailer.send(options, callback)
}
