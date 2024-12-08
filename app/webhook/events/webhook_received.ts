import UserModel from '#user/user_model'
import { BaseEvent } from '@adonisjs/core/events'
import type { WebhookFeedCommentsPayload } from '#webhook/webhook_validators'

type WebhooksPayload = WebhookFeedCommentsPayload

export default class WebkookReceived extends BaseEvent {
  constructor(public payload: WebhooksPayload) {
    super()
  }
}
