import MessageModel from '#message/message_model'
import { inject } from '@adonisjs/core'
import { MessageType } from '#message/message_validator'

@inject()
export default class MessageRepository {
  async create_or_update(args: MessageType) {
    MessageModel.updateOrCreate(
      { userId: args.user_id, postId: args.post_id },
      {
        message: args.message,
        postId: args.post_id,
        userId: args.user_id,
      }
    )
  }
}
