import { type HttpContext } from '@adonisjs/core/http'
import { assert, verifySignature } from '#utils/utils'
import env from '#start/env'
import WebkookReceived from '#webhook/events/webhook_received'
import { webhook_feed_comments_validator } from './webhook_validators.js'

export default class WebhookController {
  async verification({ response, request }: HttpContext) {
    const payload = request.qs()
    if (payload['hub.verify_token'] === env.get('INSTAGRAM_WEBHOOKS')) {
      return response.status(200).json(payload['hub.challenge'])
    }
    return response.status(403)
  }
  async events({ request, response }: HttpContext) {
    const header_signature = request.header('X-Hub-Signature-256')
    if (header_signature === undefined) {
      return response.status(422)
    }
    const payload = request.raw()
    const signature_is_valid = verifySignature(payload, header_signature)
    if (signature_is_valid) {
      const [error, data] = await webhook_feed_comments_validator.tryValidate(request.body())
      if (error) {
        console.error(error)
      }
      assert(data, 'The Payload is null')
      WebkookReceived.dispatch(data)
    }
    return response.ok(signature_is_valid)
  }
}
