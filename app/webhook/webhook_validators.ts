import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const webhook_feed_comments_validator = vine.compile(
  vine.object({
    entry: vine.array(
      vine.object({
        id: vine.string(),
        time: vine.number(),
        changes: vine.array(
          vine.object({
            value: vine.object({
              from: vine.object({
                id: vine.string(),
                username: vine.string(),
              }),
              media: vine.object({
                id: vine.string(),
                media_product_type: vine.string(),
              }),
              id: vine.string(),
              text: vine.string(),
            }),
            field: vine.string(),
          })
        ),
      })
    ),
    object: vine.literal('instagram'),
  })
)

export type WebhookFeedCommentsPayload = Infer<typeof webhook_feed_comments_validator>
