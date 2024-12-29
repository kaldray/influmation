import type { HttpContext } from '@adonisjs/core/http'
import PostService from '#post/post_service'
import { assert, assertIsString } from '#utils/utils'
import { inject } from '@adonisjs/core'
import MessageService from '#message/message_service'
import { message_validator } from '#message/message_validator'
import MessageDto from '#message/message_dto'

@inject()
export default class PostController {
  constructor(
    private post_service: PostService,
    private message_service: MessageService
  ) {}
  async show({ request, auth, inertia, response }: HttpContext) {
    const id = request.param('id')
    const user = auth.user
    assert(user, 'User is not defined')
    assertIsString(id)
    const media = await this.post_service.getUserMedia(user.accessToken, id)
    if ('error' in media) {
      return response.redirect('/home')
    }
    const message = await this.message_service.findOneBy(user.id, id)

    return inertia.render('post', { media: media, message: new MessageDto(message).toJson() })
  }
  async store({ request, auth, response, session }: HttpContext) {
    const user = auth.user
    assert(user, 'User is not defined')
    const data = {
      user_id: user.id,
      ...request.body(),
    }
    const payload = await message_validator.validate(data)
    await this.message_service.create_or_update(payload)
    session.flash('sucess', 'Le message à été enregistré avec succes !')
    return response.redirect().back()
  }
}
