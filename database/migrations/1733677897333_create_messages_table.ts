import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('message')
      table.string('post_id')
      table.string('oauth_provider_id').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('oauth_provider_id').references('users.oauth_provider_id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
