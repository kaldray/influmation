import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const message_validator = vine.compile(
  vine.object({
    message_to_sent: vine.string().trim(),
    message_to_listen: vine.string().trim(),
    post_id: vine.string(),
    user_id: vine.number().exists({ table: 'users', column: 'id' }),
  })
)

export type MessageType = Infer<typeof message_validator>
