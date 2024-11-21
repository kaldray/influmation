import { inject } from '@adonisjs/core'
import { type InstagramUser } from './type.js'
import UserRepository from './user_repository.js'

@inject()
export default class UserServices {
  constructor(private user_ropository: UserRepository) {}

  create_user(user: InstagramUser) {
    return this.user_ropository.create_or_update(user)
  }
}
