import UserModel from './user_model.js'
import type { InstagramUser } from './type.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UserRepository {
  async create_or_update(args: InstagramUser): Promise<UserModel> {
    const user = await UserModel.updateOrCreate(
      { oauthProviderId: args.user_id, oauthProviderName: 'instagram' },
      {
        username: args.username,
        oauthProviderId: args.user_id,
        oauthProviderName: 'instagram',
        expiresIn: args.expires_in,
        accessToken: args.access_token,
      }
    )
    return user
  }
}
