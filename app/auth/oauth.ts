import StateMismatchException from '#exceptions/exceptions'
import { base64 } from '@adonisjs/core/helpers'

export function generateState(): string {
  const randomValues = new Uint8Array(32)
  crypto.getRandomValues(randomValues)
  return base64.urlEncode(randomValues)
}

export function verifyState(urlState: string, sessionState: string): boolean {
  if (urlState !== sessionState) {
    throw new StateMismatchException('State mismatch')
  }
  return true
}
