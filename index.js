'use strict'

const Pushover = require('pushover-notifications')
const moment = require('moment')
const winston = require('winston')
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, { 'timestamp': true, 'colorize': true })

const push = new Pushover({
  user: process.env['WATCHMEN_PUSHOVER_USER'],
  token: process.env['WATCHMEN_PUSHOVER_TOKEN']
})

const sendPushNotification = (service, title, message, priority) => {
  let payload = {
      message, title, priority,
      url: service.url,
      url_title: service.name
  }

  push.send(payload, (err, result) => {
    if (err) winston.error(err)
    console.info(result)
  })
}

exports = module.exports = (watchmen) => {
  watchmen.on('new-outage', (service, outage) => {
    sendPushNotification(service, `${service.name} down!`, JSON.stringify(outage.error), 2)
  })
  
  watchmen.on('service-back', (service, lastOutage) => {
    let duration = moment.duration(moment().diff(lastOutage.timestamp))
    sendPushNotification(service, `${service.name} is back`, `Down for ${duration.humanize()}`, 0)
  })
}