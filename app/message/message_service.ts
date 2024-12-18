import { inject } from '@adonisjs/core'
import MessageRepository from '#message/message_repository'
import { MessageType } from './message_validator.js'

@inject()
export default class MessageService {
  constructor(private message_repository: MessageRepository) {}

  async create_or_update(args: MessageType) {
    this.message_repository.create_or_update(args)
  }
}
