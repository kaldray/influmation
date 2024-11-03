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

export default class IntagramService {
  #authorize_url = 'https://www.instagram.com/oauth/authorize'
  #acces_url = 'https://api.instagram.com/oauth/access_token'
  #user_url = 'https://graph.instagram.com/v21.0/me'
  #long_access_url = 'https://graph.instagram.com/access_token'
  #scopes =
    'business_basic,business_content_publish,business_manage_comments,business_manage_messages'
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
