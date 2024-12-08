import { AuthLayout } from '#ui/components/Layout'
import { type ReactNode } from 'react'
import { type InferPageProps } from '@adonisjs/inertia/types'
import type InstagramController from '../../app/auth/instagram/instagram_controller'
import { css } from '#style/css'
import { Link } from '@inertiajs/react'

const Home = ({ medias }: InferPageProps<InstagramController, 'getMedia'>) => {
  return (
    <>
      <h1 className={css({ marginTop: '3.5' })}>Vos publications</h1>
      <section
        className={css({
          display: 'flex',
          flexFlow: 'wrap',
          gap: '1.5',
          justifyContent: 'space-between',
        })}
      >
        <Media medias={medias} />
      </section>
    </>
  )
}

function Media({ medias }: InferPageProps<InstagramController, 'getMedia'>) {
  return (
    <>
      {medias.map((data) => {
        if ('thumbnail_url' in data) {
          return (
            <div
              key={data.id}
              className={css({
                maxWidth: '1/4',
              })}
            >
              <Link href={`post/${data.id}`}>
                <img
                  className={css({
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    aspectRatio: '4/5',
                    _hover: {
                      cursor: 'pointer',
                    },
                  })}
                  src={data.thumbnail_url}
                  alt="Choisir cette image pour placer un évenement"
                />
              </Link>
            </div>
          )
        }
        return (
          <div
            key={data.id}
            className={css({
              maxWidth: '1/4',
            })}
          >
            <Link href={`post/${data.id}`}>
              <img
                className={css({
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  aspectRatio: '4/5',
                  _hover: {
                    cursor: 'pointer',
                  },
                })}
                src={data.media_url}
                alt="Choisir cette image pour placer un évenement"
              />
            </Link>
          </div>
        )
      })}
    </>
  )
}

Home.layout = (page: ReactNode) => <AuthLayout children={page} />
export default Home
