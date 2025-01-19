import type { HttpContext } from '@adonisjs/core/http'
import MessageRepository from './message_repository.js'
import { inject } from '@adonisjs/core'
import MessageDto from './message_dto.js'

@inject()
export default class MessageController {
  constructor(private messageRepository: MessageRepository) {}
  async index({ inertia }: HttpContext) {
    const messages = await this.messageRepository.getAll()
    return inertia.render('dashboard', { messages: new MessageDto(messages).toArray() })
  }
}
