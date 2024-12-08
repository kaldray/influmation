import type { HttpContext } from '@adonisjs/core/http'
import PostService from '#post/post_service'
import { assert, assertIsString } from '#utils/utils'
import { inject } from '@adonisjs/core'

@inject()
export default class PostController {
  constructor(private post_service: PostService) {}
  async show({ request, auth, inertia, response }: HttpContext) {
    const id = request.param('id')
    const user = auth.user
    assert(user, 'User is not defined')
    assertIsString(id)
    const media = await this.post_service.getUserMedia(user.accessToken, id)
    if ('error' in media) {
      return response.redirect('/home')
    }
    return inertia.render('post', { media: media })
  }
}
