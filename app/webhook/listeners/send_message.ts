import MessageService from '#message/message_service'
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
    webhook_service: WebhookService,
    message_service: MessageService
  ) {
    const data = event.payload.entry.at(0)
    assert(data, 'Payload entry is undefined')
    const user = await user_service.find_by('oauth_provider_id', data.id)
    const data_level_two = data.changes.at(0)
    assert(user, 'User is undefined')
    assert(data_level_two, 'Payload value is undefined')
    const media_id = data_level_two.value.media.id
    const user_message = await message_service.findBy(user.id, media_id)
    if (user_message.length > 0) {
      if (
        data_level_two.value.text.toLowerCase() === user_message[0].messageToListen.toLowerCase()
      ) {
        const message: TextMessagePayload = {
          recipient: {
            id: data_level_two.value.from.id,
          },
          message: { text: user_message[0].messageToSent },
        }
        await webhook_service.sendCommentResponse(user.accessToken, user.oauthProviderId, message)
      }
    }
  }
}
