import MessageModel from '#message/message_model'
import { inject } from '@adonisjs/core'
import { MessageType } from '#message/message_validator'

@inject()
export default class MessageRepository {
  async create_or_update(args: MessageType) {
    MessageModel.updateOrCreate(
      { userId: args.user_id, postId: args.post_id },
      {
        messageToSent: args.message_to_sent,
        messageToListen: args.message_to_listen,
        postId: args.post_id,
        userId: args.user_id,
      }
    )
  }

  async findByUserAndPost(user_id: number, post_id: string) {
    return MessageModel.findManyBy({ userId: user_id, postId: post_id })
  }

  async findUniqueByUserAndPost(user_id: number, post_id: string) {
    return MessageModel.findBy({ userId: user_id, postId: post_id })
  }
}
