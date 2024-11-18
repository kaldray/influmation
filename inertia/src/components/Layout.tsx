import { type PropsWithChildren } from 'react'
import { Navbar } from './Navbar'
import { css } from '#style/css'

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <section className={css({ maxWidth: '80%', margin: 'auto' })}>{children}</section>
    </>
  )
}
