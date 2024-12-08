import env from '#start/env'
import { createHmac, timingSafeEqual } from 'node:crypto'

export function assert(value: unknown, message: string): asserts value {
  if (!value) {
    throw new Error(message ?? 'Assertion error')
  }
}

export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string')
  }
}

function generateSignature(payload: any) {
  const signature = createHmac('sha256', env.get('INSTAGRAM_CLIENT_SECRET'))
    .update(payload)
    .digest('hex')
  return `sha256=${signature}`
}

export function verifySignature(payload: any, signatureHeader: string) {
  const expectedSignature = generateSignature(payload)
  return timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signatureHeader))
}
