import UserModel from './user_model.js'
import type { InstagramUser } from './type.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UserRepository {
  async create_or_update(args: InstagramUser): Promise<UserModel> {
    const user = await UserModel.updateOrCreate(
      { oauthProviderId: String(args.user_id), oauthProviderName: 'instagram' },
      {
        username: args.username,
        oauthProviderId: String(args.user_id),
        oauthProviderName: 'instagram',
        expiresIn: args.expires_in,
        accessToken: args.access_token,
      }
    )
    return user
  }

  async update_is_subscribe(primary_key: number) {
    const user = await UserModel.findOrFail(primary_key)
    user.isSubscribe = true
    await user.save()
  }

  async find_by(by: string, id: string) {
    const user = await UserModel.findBy({ [by]: id })
    return user
  }
}
