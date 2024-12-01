/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const InstagramController = () => import('#instagram/instagram_controller')
const AuthController = () => import('#auth/auth_controller')
const WebhookController = () => import('#webhook/webhook_controller')

router
  .group(() => {
    router.get('/home', [InstagramController, 'getMedia'])
    router.post('/logout', [AuthController, 'logout'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/facebook/redirect', [InstagramController, 'handleRedirect']).as('auth.redirect')
  })
  .prefix('/api/v1')

router.get('/', async ({ inertia }) => {
  return inertia.render('guest')
})

router.group(() => {
  router.get('/webhooks', [WebhookController, 'verification'])
})

router.get('/vie-privee', ({ inertia }) => inertia.render('privacy'))
router.get('login', [InstagramController, 'authorization'])
