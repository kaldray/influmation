import { inject } from '@adonisjs/core'
import MessageRepository from '#message/message_repository'
import { MessageType } from './message_validator.js'

@inject()
export default class MessageService {
  constructor(private message_repository: MessageRepository) {}

  async create_or_update(args: MessageType) {
    this.message_repository.create_or_update(args)
  }

  async findBy(user_id: number, post_id: string) {
    return this.message_repository.findByUserAndPost(user_id, post_id)
  }

  async findOneBy(user_id: number, post_id: string) {
    return this.message_repository.findUniqueByUserAndPost(user_id, post_id)
  }
}
