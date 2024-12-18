import { type PropsWithChildren } from 'react'
import { Navbar } from './Navbar'
import { css } from '#style/css'
import { usePage } from '@inertiajs/react'
import type { SharedProps } from '@adonisjs/inertia/types'
import { Flash } from './Flash'

export function AuthLayout({ children }: PropsWithChildren) {
  const { sucess } = usePage<SharedProps>().props
  return (
    <>
      <Navbar />
      <section className={css({ maxWidth: '80%', margin: 'auto' })}>
        <Flash type="succes">{sucess}</Flash>
        {children}
      </section>
    </>
  )
}
