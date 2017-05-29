'use strict'

const Pushover = require('pushover-notifications')
const moment = require('moment')
const winston = require('winston')
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, { 'timestamp': true, 'colorize': true })

const pushoverConfig = {
  user: process.env['WATCHMEN_PUSHOVER_USER'],
  token: process.env['WATCHMEN_PUSHOVER_TOKEN']
}

const push = new Pushover(pushoverConfig)

const sendPushNotification = (service, title, message, priority) => {
  let payload = {
      message, title, priority,
      url: service.url,
      url_title: service.name
  }

  if (priority === 2) {
    payload.retry = 30
    payload.expire = 3600
  }

  push.send(payload, (err, result) => {
    if (err) winston.error(err)
    winston.info('[Pushover]', result)
  })
}

exports = module.exports = (watchmen) => {
  if (!pushoverConfig.user || !pushoverConfig.token) {
    winston.warn('[Pushover] You have to provide WATCHMEN_PUSHOVER_USER and WATCHMEN_PUSHOVER_USER as environment variables!')
    winston.warn('[Pushover] Is not enabled...')
    return
  }

  watchmen.on('new-outage', (service, outage) => {
    sendPushNotification(service, `${service.name} down!`, JSON.stringify(outage.error), 2)
  })
  
  watchmen.on('service-back', (service, lastOutage) => {
    let duration = moment.duration(moment().diff(lastOutage.timestamp))
    sendPushNotification(service, `${service.name} is back`, `${service.name} was down for ${duration.humanize()}`, 0)
  })
}
