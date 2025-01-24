import { assert } from '#utils/utils'

export type ConversationList = {
  data: Array<{
    id: string
    updated_time: string
  }>
  paging: {
    cursors: {
      after: string
    }
    next: string
  }
}

export type ConversationMessageList = {
  messages: {
    data: Array<{
      id: string
      created_time: string
    }>
  }
  id: string
}
export type MessagesInformations = {
  id: string
  created_time: string
  to: {
    data: Array<{
      username: string
      id: string
    }>
  }
  from: {
    username: string
    id: string
  }
  reactions: {
    data: Array<{
      users: Array<{
        username: string
        id: string
      }>
      emoji: string
    }>
    paging: {
      cursors: {
        before: string
        after: string
      }
    }
  }
  message: string
}

export default class ConversationService {
  #base_url = 'https://graph.instagram.com/v21.0' as const

  async getConversationList(accessToken: string): Promise<ConversationList> {
    const url = new URL(`${this.#base_url}/me/conversations`)
    url.searchParams.set('plateform', 'instagram')
    url.searchParams.set('limit', '100')
    url.searchParams.set('access_token', accessToken)
    const response = await fetch(url)
    return response.json() as Promise<ConversationList>
  }

  async getConversationMessageList(
    accessToken: string,
    conversationId: string
  ): Promise<ConversationMessageList> {
    const url = new URL(`${this.#base_url}/${conversationId}`)
    url.searchParams.set('fields', 'messages')
    url.searchParams.set('access_token', accessToken)
    const response = await fetch(url)
    return response.json() as Promise<ConversationMessageList>
  }

  async getMessagesInformations(
    accessToken: string,
    messageId: string
  ): Promise<MessagesInformations> {
    const url = new URL(`${this.#base_url}/${messageId}`)
    url.searchParams.set(
      'fields',
      'id,created_time,from,to,message,reactions,attachments.data(id,file_url)'
    )
    url.searchParams.set('access_token', accessToken)
    const response = await fetch(url)
    return response.json() as Promise<MessagesInformations>
  }

  async getConversaationSpecificPerson(
    accessToken: string,
    userId: string
  ): Promise<Omit<ConversationList, 'paging'>> {
    const url = new URL(`${this.#base_url}/me/conversations`)
    url.searchParams.set('user_id', userId)
    url.searchParams.set('access_token', accessToken)
    const response = await fetch(url)
    return response.json() as Promise<Omit<ConversationList, 'paging'>>
  }

  async displayPrivateMessageList(accessToken: string) {
    const conversations = await this.getConversationList(accessToken)
    const conversationsIds = conversations.data.map((conversation) => conversation.id)

    const conversationMessagesPromises = conversationsIds.map((id) =>
      this.getConversationMessageList(accessToken, id)
    )
    const conversationMessagesResults = await Promise.allSettled(conversationMessagesPromises)
    const conversationMessages = conversationMessagesResults
      .filter((data) => {
        if (data.status === 'fulfilled' && 'messages' in data.value) {
          return true
        }
      })
      .map((data) => {
        if (data.status === 'fulfilled') {
          return { conversationId: data.value.id, messageId: data.value.messages?.data[0].id }
        }
      })

    const conversationMessagesWithMessages = conversationMessages.map((data) => {
      assert(data, 'There is no message id')
      return this.getMessagesInformations(accessToken, data.messageId)
    })
    const messages = await Promise.all(conversationMessagesWithMessages)
    return messages
  }

  async displayPrivateMessage(userId: string, accessToken: string) {
    let privateMessages
    if (userId) {
      const conversationsDetails = await this.getConversaationSpecificPerson(accessToken, userId)
      const uniqueConversationMessage = await this.getConversationMessageList(
        accessToken,
        conversationsDetails.data[0].id
      )
      const uniqueMessagePromises = uniqueConversationMessage.messages.data.map((message) =>
        this.getMessagesInformations(accessToken, message.id)
      )
      privateMessages = await Promise.all(uniqueMessagePromises)
      privateMessages = privateMessages.sort((a, b) => (a.created_time > b.created_time ? 1 : -1))
    }
    return privateMessages
  }
}
