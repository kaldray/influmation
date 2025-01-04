import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import Message from '#message/message_model'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare isSubscribe: boolean

  @column()
  declare accessToken: string

  @column()
  declare oauthProviderId: string

  @column()
  declare oauthProviderName: string

  @column()
  declare expiresIn: number

  @column.dateTime({ autoCreate: true })
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  static async setExpiresAt(user: User) {
    user.expiresAt = DateTime.now().plus({ seconds: user.expiresIn })
    hash.restore()
  }

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
}
