import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async logout({ auth, response, inertia }: HttpContext) {
    await auth.use('web').logout()
    inertia.clearHistory()
    return response.redirect('/')
  }
}
