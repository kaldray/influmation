import MessageModel from '#message/message_model'

export default class MessageDto {
  constructor(private message: MessageModel | null) {}

  toJson() {
    if (this.message) {
      return {
        message_to_sent: this.message.messageToSent,
        message_to_listen: this.message.messageToListen,
        post_id: this.message.postId,
      }
    }
  }
}
