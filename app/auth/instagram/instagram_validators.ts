import vine from '@vinejs/vine'

const url_authorization = vine.group([
  vine.group.if((data) => 'code' in data, {
    code: vine.string(),
  }),
  vine.group.if((data) => 'error' in data, {
    error: vine.string(),
    error_reason: vine.string(),
    error_description: vine.string(),
  }),
])

export const url_authorization_schema = vine
  .object({
    state: vine.string(),
  })
  .merge(url_authorization)
