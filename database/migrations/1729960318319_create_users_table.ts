import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').notNullable()
      table.integer('expires_in').notNullable()
      table.string('access_token').notNullable()
      table.bigint('oauth_provider_id').notNullable().unsigned()
      table.string('oauth_provider_name').notNullable()
      table.unique(['oauth_provider_id', 'oauth_provider_name'])

      table.timestamp('created_at').notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
