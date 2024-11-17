import { HStack } from '#style/jsx'
import { css } from '#style/css'
import { Link } from './ui/link'

export function Navbar() {
  return (
    <>
      <nav className={css({ bgColor: '#000', padding: '2.5' })}>
        <HStack justifyContent={'flex-end'}>
          <Link href="/logout" color={'white'} _hover={{ textDecorationColor: 'white' }}>
            Se déconnectez
          </Link>
        </HStack>
      </nav>
    </>
  )
}
