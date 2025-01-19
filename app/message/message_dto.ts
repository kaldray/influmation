import MessageModel from '#message/message_model'

export default class MessageDto {
  constructor(private message: (MessageModel | MessageModel[]) | null) {}

  toJson() {
    if (this.message && !Array.isArray(this.message)) {
      return {
        message_to_sent: this.message.messageToSent,
        message_to_listen: this.message.messageToListen,
        post_id: this.message.postId,
      }
    }
  }

  toArray() {
    if (this.message && Array.isArray(this.message)) {
      return this.message.map((message) => {
        return {
          message_to_sent: message.messageToSent,
          message_to_listen: message.messageToListen,
          post_id: message.postId,
        }
      })
    }
  }
}
