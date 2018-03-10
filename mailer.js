'use strict'

var moment = require('moment')
var nodemailer = require('nodemailer')
var $ = require('jquery')(require("jsdom").jsdom().defaultView)
var transporter
var smtpConfig
var fromAccount
var toAccount

function init(sc, from, to, callback) {
    smtpConfig = sc
    fromAccount = from
    toAccount = to
    parameterCheck()
    transporter = nodemailer.createTransport(smtpConfig)
    transporter.verify(function (err, success) {
        if (callback && typeof callback == 'function') {
            callback(err, success)
        }
    })
}

function parameterCheck() {
    if (!smtpConfig || !fromAccount || !toAccount) {
        throw new Error('invalid configuration for mailer.')
    }
}


var send = function (mailOptions, callback) {
    parameterCheck()
    var tail = '\n\nauto by mailer\n' + moment().format('YYYY-MM-DD HH:mm:ss')
    mailOptions = mailOptions || {}
    mailOptions.from = mailOptions.from || fromAccount
    mailOptions.to = mailOptions.to || toAccount
    mailOptions.subject = mailOptions.subject || 'job - test mail'
    mailOptions.text = (mailOptions.text || '') + tail
    mailOptions.html = getHtml(mailOptions)

    transporter.sendMail(mailOptions, function (err, info) {
        if (callback && typeof callback === 'function') {
            callback(err, info)
        }
    })
}

function getHtml(mailOptions) {
    if (mailOptions) {
        if (mailOptions.html) return mailOptions.html || ''
        var container = $('<div>')
        var table = $('<table>', { border: "1", cellspacing: "0", cellpadding: "0" })
        container.append(table)
        if (mailOptions.table) {
            if (mailOptions.table.header) {
                let tr = $('<tr>')
                for (var h of mailOptions.table.header) {
                    tr.append($('<th>').text(h))
                }
                table.append(tr)
            }
            if (mailOptions.table.data) {
                for (var row of mailOptions.table.data) {
                    let tr = $('<tr>')
                    for (var cell of row) {
                        tr.append($('<td>').text(cell))
                    }
                    table.append(tr)
                }
            }
            return container.html()
        } else if (mailOptions.json) {
            for (let p in mailOptions.json) {
                let tr = $('<tr>')
                tr.append($('<td>').text(p)).append($('<td>').text(mailOptions.json[p]))
                table.append(tr)
            }
            return container.html()
        }
    }
    return ''
}
exports.init = init
exports.send = send
