import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import IntagramService from '#instagram/instagram_service'
import UserRepository from '#user/user_repository'
import { generateState, verifyState } from '#auth/oauth'
import { url_authorization_schema } from '#instagram/instagram_validators'
import vine from '@vinejs/vine'

@inject()
export default class InstargamController {
  constructor(
    private instagram_service: IntagramService,
    private user_repository: UserRepository
  ) {}

  authorization({ response, session }: HttpContext) {
    const state = generateState()
    session.put('state_insta', state)
    return response.redirect().status(303).toPath(this.instagram_service.makeAutorizationUrl(state))
  }

  async handleRedirect({ request, response, auth, session }: HttpContext) {
    const sessionState = session.pull('state_insta')
    const data = await vine.validate({ schema: url_authorization_schema, data: request.qs() })
    verifyState(data.state, sessionState)
    if ('error' in data) {
      session.flash('error', data.error)
      response.abort({ message: data.error })
    } else {
      const access_response = await this.instagram_service.getAccessToken(data.code)
      const { user_id, username } = await this.instagram_service.getUserInfo(
        access_response.access_token
      )
      const { access_token, expires_in } = await this.instagram_service.getLongAccesToken(
        access_response.access_token
      )
      const user = await this.user_repository.create_or_update({
        user_id,
        username,
        access_token,
        expires_in,
        oauthProviderName: 'instagram',
      })
      session.put('instagram_token', access_token)
      session.put('instagram_token_expires', user.expiresAt)
      await auth.use('web').login(user)
    }
  }
}
