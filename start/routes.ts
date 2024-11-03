/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const InstagramOAuthController = () => import('#instagram/instagram_controller')

router.get('/', async ({ inertia }) => {
  return inertia.render('home')
})

router
  .group(() => {
    router
      .get('/facebook/redirect', [InstagramOAuthController, 'handleRedirect'])
      .as('auth.redirect')
  })
  .prefix('/api/v1')

router.get('login', [InstagramOAuthController, 'authorization'])
