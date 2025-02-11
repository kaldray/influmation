import { VStack } from '#style/jsx'
import { Button } from '#ui/components/ui/button'
import { Link } from '#ui/components/ui/link'
import { Head } from '@inertiajs/react'

const Guest = () => {
  return (
    <>
      <Head title="Homepage" />
      <VStack height={'100'} minH={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Button asChild>
          <Link href="login">Se connecter</Link>
        </Button>
      </VStack>
    </>
  )
}

export default Guest
