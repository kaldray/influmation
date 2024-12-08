import type { IgMediaUser, IgMediaChamps } from '#instagram/instagram_service'

type InstagramError = {
  error: {
    message: string
    type: 'OAuthException'
    is_transient: boolean
    code: number
    fbtrace_id: string
  }
}

export default class PostService {
  #base_url = 'https://graph.instagram.com/v21.0' as const

  async getUserMedia(acces_token: string, media_id: string): Promise<IgMediaUser | InstagramError> {
    const url = new URL(`${this.#base_url}/${media_id}/`)
    const arr_fields: Array<IgMediaChamps> = [
      'id',
      'username',
      'is_comment_enabled',
      'media_url',
      'media_product_type',
      'media_type',
      'timestamp',
      'thumbnail_url',
      'shortcode',
      'permalink',
    ]
    const media_fields = arr_fields.join(',')
    url.searchParams.set('access_token', acces_token)
    url.searchParams.set('fields', media_fields)
    const response = await fetch(url)
    return response.json() as Promise<IgMediaUser | InstagramError>
  }
}
