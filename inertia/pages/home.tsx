import { Head } from '@inertiajs/react'
import { styled, VStack } from '#style/jsx'
import { Link } from '#ui/components/ui/link'
import { Button } from '#ui/components/ui/button'

export default function Home() {
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
