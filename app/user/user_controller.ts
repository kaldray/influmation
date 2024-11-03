import User from '#user/user_model'
import { storeUserValidator } from '#user/user_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserServices from '#user/user_services'

@inject()
export default class UserController {
  constructor(private user_service: UserServices) {}

  public async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await storeUserValidator.validate(data)
    this.user_service.create_user(payload)
  }

  public async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    await User.verifyCredentials(email, password)
  }
}
