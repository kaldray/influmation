import { inject } from '@adonisjs/core'
import { type User } from './type.js'
import UserRepository from './user_repository.js'

@inject()
export default class UserServices {
  constructor(private user_ropository: UserRepository) {}

  create_user(user: User) {
    return this.user_ropository.create_user(user)
  }
}
