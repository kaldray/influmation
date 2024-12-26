import { test } from '@japa/runner'
import { generateSignature, verifySignature } from '#utils/utils'

const json = "{ 'test': 'test' }"

test.group('Hmac signature', () => {
  test('generate signature', async ({ assert }) => {
    assert.snapshot(generateSignature(json)).match()
  })
  test('verify signature', async ({ assert }) => {
    const expected = generateSignature(json)
    assert.isTrue(verifySignature(json, expected))
  })
})
