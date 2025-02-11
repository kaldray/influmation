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
const PostController = () => import('#post/post_controller')
const MessageController = () => import('#message/message_controller')
const ConversationController = () => import('#conversation/conversation_controller')

router
  .group(() => {
    router.get('/home', [InstagramController, 'getMedia'])
    router.post('/logout', [AuthController, 'logout'])
    router.get('/post/:id', [PostController, 'show']).as('post.show')
    router.post('/post', [PostController, 'store']).as('post.store')
    router.get('/dashboard', [MessageController, 'index'])
    router.get('/conversation/:id?', [ConversationController, 'index'])
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
  router.post('/webhooks', [WebhookController, 'events'])
})

router.get('/vie-privee', ({ inertia }) => inertia.render('privacy'))
router.get('login', [InstagramController, 'authorization'])
