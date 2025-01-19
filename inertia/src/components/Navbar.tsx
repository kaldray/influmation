import { HStack } from '#style/jsx'
import { css } from '#style/css'
import { Link } from './ui/link'
import { Link as NavLink } from '@inertiajs/react'

export function Navbar() {
  return (
    <>
      <nav className={css({ bgColor: '#000', padding: '2.5' })}>
        <HStack justifyContent={'flex-end'}>
          <Link color={'white'} _hover={{ textDecorationColor: 'white' }} asChild>
            <NavLink href="/home" as="button" prefetch type="button">
              Posts
            </NavLink>
          </Link>
          <Link color={'white'} _hover={{ textDecorationColor: 'white' }} asChild>
            <NavLink href="/dashboard" as="button" prefetch type="button">
              Vue d'ensemble
            </NavLink>
          </Link>
          <Link color={'white'} _hover={{ textDecorationColor: 'white' }} asChild>
            <NavLink href="/logout" method="post" as="button" type="button">
              Se déconnectez
            </NavLink>
          </Link>
        </HStack>
      </nav>
    </>
  )
}
