import { test } from '@japa/runner'
import env from '#start/env'

test.group('Http webhooks', () => {
  test('GET without header', async ({ client }) => {
    const request = await client.get('/webhooks')
    request.assertStatus(403)
  })
  test('GET with header', async ({ client }) => {
    const request = client.get('/webhooks')
    const response = await request.qs({
      'hub.verify_token': env.get('INSTAGRAM_WEBHOOKS'),
      'hub.challenge': 'challenge',
    })
    response.assertStatus(200)
    response.assertTextIncludes('challenge')
  })
  test('POST without header', async ({ client }) => {
    const response = await client.post('/webhooks')
    response.assertStatus(422)
  })
})
