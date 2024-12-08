import { type TextMessagePayload } from '#webhook/listeners/send_message'

type InstagramWebhookFields =
  | 'comments'
  | 'live_comments'
  | 'message_reactions'
  | 'messages'
  | 'messaging_optins'
  | 'messaging_postbacks'
  | 'messaging_referral'
  | 'messaging_seen'

export default class WebhookService {
  #base_url = 'https://graph.instagram.com/v21.0' as const

  /**
   * @param access_token
   * @param user_id
   */
  async subscribeToWebhook(access_token: string, user_id: string): Promise<{ success: true }> {
    const url = new URL(`${this.#base_url}/${user_id}/subscribed_apps`)
    const list_of_fields: Array<Partial<InstagramWebhookFields>> = [
      'comments',
      'messages',
      'messaging_seen',
    ]
    url.searchParams.set('access_token', access_token)
    url.searchParams.set('subscribed_fields', list_of_fields.join(','))
    const response = await fetch(url, { method: 'POST' })
    return response.json() as Promise<{
      success: true
    }>
  }

  async sendCommentResponse(access_token: string, user_id: string, body: TextMessagePayload) {
    const url = new URL(`${this.#base_url}/${user_id}/messages`)
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${access_token}`)
    headers.append('Content-Type', 'application/json')
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    })
    return response.json()
  }
}
