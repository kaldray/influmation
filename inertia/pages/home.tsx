import { AuthLayout } from '#ui/components/Layout'
import { type ReactNode } from 'react'
import { type InferPageProps } from '@adonisjs/inertia/types'
import type InstagramController from '../../app/auth/instagram/instagram_controller'

const Home = (props: InferPageProps<InstagramController, 'getMedia'>) => {
  console.log(props)
  return (
    <>
      <h1>HOME</h1>
    </>
  )
}

Home.layout = (page: ReactNode) => <AuthLayout children={page} />

export default Home
