import env from '#start/env'

type AccesTokenResponse = {
  access_token: string
  user_id: number
  permissions: Array<string>
}

type UserInfoResponse = {
  user_id: string
  username: string
  id: string
}

type LongAccessResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

type IdsMediaUserResponse = {
  data: Array<{
    id: string
  }>
  paging: {
    cursors: {
      before: string
      after: string
    }
  }
}

type IgMediaUser =
  | {
      id: string
      is_comment_enabled: boolean
      media_product_type: 'FEED' | 'AD' | 'STORY' | 'REELS'
      media_type: 'VIDEO'
      media_url: string
      permalink: string
      shortcode: string
      timestamp: string
      thumbnail_url: string
      username: string
    }
  | {
      id: string
      is_comment_enabled: boolean
      media_product_type: 'FEED' | 'AD' | 'STORY' | 'REELS'
      media_type: 'CAROUSEL_ALBUM' | 'IMAGE' | 'VIDEO'
      media_url: string
      permalink: string
      shortcode: string
      timestamp: string
      username: string
    }

type IgMediasUser = Array<IgMediaUser>

export type IgMediaChamps =
  | 'boost_ads_list'
  | 'boost_eligibility_info'
  | 'caption'
  | 'comments_count'
  | 'copyright_check_information.status'
  | 'id'
  | 'is_comment_enabled'
  | 'is_shared_to_feed'
  | 'like_count'
  | 'media_product_type'
  | 'media_type'
  | 'media_url'
  | 'owner'
  | 'permalink'
  | 'shortcode'
  | 'thumbnail_url'
  | 'timestamp'
  | 'username'

export default class IntagramService {
  #authorize_url = 'https://www.instagram.com/oauth/authorize'
  #acces_url = 'https://api.instagram.com/oauth/access_token'
  #user_url = 'https://graph.instagram.com/v21.0/me'
  #base_url = 'https://graph.instagram.com/v21.0'
  #long_access_url = 'https://graph.instagram.com/access_token'
  #scopes =
    'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments'
  #fields = 'user_id,username'
  #redirect_uri = 'https://api.influmation/api/v1/facebook/redirect'

  makeAutorizationUrl(state: string): string {
    return `${new URL(this.#authorize_url)}?${this.#buildAutorizationSearchParams(state)}`
  }

  /**
   *  @param code - Code that we get after autorization
   **/
  async getAccessToken(code: string): Promise<AccesTokenResponse> {
    const res = await fetch(`${new URL(this.#acces_url)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: this.#buildAccesTokenSearchParams(code),
    })
    const response = (await res.json()) as Promise<AccesTokenResponse>
    return response
  }

  /**
   * @param token - Access token
   **/
  async getUserInfo(token: string): Promise<UserInfoResponse> {
    const res = await fetch(`${new URL(this.#user_url)}?${this.#buildUserInfoSearchParams(token)}`)
    const response = (await res.json()) as Promise<UserInfoResponse>
    return response
  }

  /**
   * @param token - Access token
   **/
  async getLongAccesToken(acces_token: string): Promise<LongAccessResponse> {
    const res = await fetch(
      `${new URL(this.#long_access_url)}?${this.#buildLongAccesTokenSearchParams(acces_token)}`
    )
    const response = (await res.json()) as Promise<LongAccessResponse>
    return response
  }

  async getUserMediaIDs(acces_token: string, user_id: string): Promise<IdsMediaUserResponse> {
    const url = new URL(`${this.#base_url}/${user_id}/media`)
    url.searchParams.set('access_token', acces_token)
    const response = await fetch(url)
    return response.json() as Promise<IdsMediaUserResponse>
  }

  async getUserMedia(acces_token: string, media_id: string) {
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
    return response.json() as Promise<IgMediasUser>
  }

  #buildAutorizationSearchParams(state: string): string {
    return new URLSearchParams({
      client_id: env.get('INSTAGRAM_CLIENT_ID'),
      response_type: 'code',
      scope: this.#scopes,
      redirect_uri: this.#redirect_uri,
      state: state,
    }).toString()
  }

  #buildAccesTokenSearchParams(code: string): string {
    return new URLSearchParams({
      client_id: env.get('INSTAGRAM_CLIENT_ID'),
      client_secret: env.get('INSTAGRAM_CLIENT_SECRET'),
      grant_type: 'authorization_code',
      redirect_uri: this.#redirect_uri,
      code: code,
    }).toString()
  }

  #buildUserInfoSearchParams(token: string): string {
    return new URLSearchParams({
      fields: this.#fields,
      access_token: token,
    }).toString()
  }

  #buildLongAccesTokenSearchParams(access_token: string): string {
    return new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret: env.get('INSTAGRAM_CLIENT_SECRET'),
      access_token: access_token,
    }).toString()
  }
}
