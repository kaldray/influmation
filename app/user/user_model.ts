import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import Message from '#message/message_model'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare isSubscribe: boolean

  @column({ serializeAs: null })
  declare accessToken: string

  @column({ serializeAs: null })
  declare oauthProviderId: string

  @column({ serializeAs: null })
  declare oauthProviderName: string

  @column({ serializeAs: null })
  declare expiresIn: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async setExpiresAt(user: User) {
    user.expiresAt = DateTime.now().plus({ seconds: user.expiresIn })
    hash.restore()
  }

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
}
