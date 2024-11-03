import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

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
  static setExpiresAt(user: User) {
    user.expiresAt = DateTime.now().plus({ seconds: user.expiresIn })
  }
}
