import type { HttpContext } from '@adonisjs/core/http'
import ConversationService from './conversation_service.js'
import { inject } from '@adonisjs/core'
import { assert } from '#utils/utils'

@inject()
export default class ConversationController {
  constructor(private conversationService: ConversationService) {}
  async index({ inertia, params, session }: HttpContext) {
    const accessToken = session.get('instagram_token')
    assert(accessToken, 'There is no access token')
    const userId = params.id

    return inertia.render('conversation', {
      messages: () => this.conversationService.displayPrivateMessageList(accessToken),
      privateMessages: inertia.defer(() =>
        this.conversationService.displayPrivateMessage(userId, accessToken)
      ),
    })
  }
}
