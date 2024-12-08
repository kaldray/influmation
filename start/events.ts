import emitter from '@adonisjs/core/services/emitter'
import WebhookReceived from '#webhook/events/webhook_received'

emitter.listen(WebhookReceived, [() => import('#webhook/listeners/send_message')])
emitter.onError((event, error, eventData) => {
  console.log(event, error)
})
