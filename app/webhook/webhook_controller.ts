import { type HttpContext } from '@adonisjs/core/http'
import { assert, verifySignature } from '#utils/utils'
import env from '#start/env'

export default class WebhookController {
  async verification({ response, request }: HttpContext) {
    const payload = request.qs()
    if (payload['hub.verify_token'] === env.get('INSTAGRAM_WEBHOOKS')) {
      return response.status(200).send(payload['hub.challenge'])
    }
    return response.status(403)
  }
  async events({ request, response }: HttpContext) {
    const header_signature = request.header('X-Hub-Signature-256')
    assert(header_signature, 'Header Signature is undefined')
    const payload = request.raw()
    const signature_is_valid = verifySignature(payload, header_signature)
    return response.ok(signature_is_valid)
  }
}
