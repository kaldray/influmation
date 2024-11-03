import vine from '@vinejs/vine'
import env from '#start/env'

export const storeUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return Boolean(!user)
      }),
    fullname: vine.string().trim(),
    password:
      env.get('NODE_ENV') === 'development'
        ? vine.string()
        : vine.string().minLength(6).maxLength(24),
    type: vine.enum(['driver', 'passenger']),
  })
)
