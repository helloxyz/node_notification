# node_notification
node module for notification, current only support email notification

example

```javascript
var notification = require('./index')

var from = 'fromxxx@163.com'
var to = 'toxxx1@126.com, toxxx2@hotmail.com'
var smtpConfig = {
    host: 'smtp.163.com',
    port: 25,
    secure: false,
    auth: {
        user: from,
        pass: 'xxx'
    }
}
notification.initialize('email', {
    smtpConfig: smtpConfig,
    from: from,
    to: to
})

notification.send({
    subject: 'test email from notification module',
    message: 'hello world!!!'
})
```
