import { type PropsWithChildren } from 'react'
import { Navbar } from './Navbar'

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
