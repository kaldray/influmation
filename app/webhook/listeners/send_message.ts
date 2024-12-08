import UserServices from '#user/user_services'
import { assert } from '#utils/utils'
import WebhookReceived from '#webhook/events/webhook_received'
import WebhookService from '#webhook/webhook_service'
import { inject } from '@adonisjs/core'

export type TextMessagePayload = {
  recipient: {
    id: string
  }
  message: {
    text: string
  }
}

export default class SendMessage {
  @inject()
  async handle(
    event: WebhookReceived,
    user_service: UserServices,
    webhook_service: WebhookService
  ) {
    const data = event.payload.entry.at(0)
    assert(data, 'Payload entry is undefined')
    const user = await user_service.find_by('oauth_provider_id', data.id)
    const data_level_two = data.changes.at(0)
    assert(user, 'User is undefined')
    assert(data_level_two, 'Payload value is undefined')
    const message: TextMessagePayload = {
      recipient: {
        id: data_level_two.value.from.id,
      },
      message: { text: 'Test des webhooks' },
    }
    await webhook_service.sendCommentResponse(user.accessToken, user.oauthProviderId, message)
  }
}
