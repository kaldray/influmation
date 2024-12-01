import { type HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class WebhookController {
  async verification({ response, request }: HttpContext) {
    const payload = request.qs()
    if (payload['hub.verify_token'] === env.get('INSTAGRAM_WEBHOOKS')) {
      return response.status(200).send(payload['hub.challenge'])
    }
    return response.status(403)
  }
}
