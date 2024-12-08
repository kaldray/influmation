import { AuthLayout } from '#ui/components/Layout'
import { type ReactNode } from 'react'
import { css } from '#style/css'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type PostController from '#post/post_controller'
import { Link } from '@inertiajs/react'

const Post = ({ media }: InferPageProps<PostController, 'show'>) => {
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
        <Media media={media} />
      </section>
    </>
  )
}

function Media({ media }: InferPageProps<PostController, 'show'>) {
  return (
    <>
      {'thumbnail_url' in media ? (
        <div
          className={css({
            maxWidth: '1/4',
          })}
        >
          <Link href="/">
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
              src={media.thumbnail_url}
              alt="Choisir cette image pour placer un évenement"
            />
          </Link>
        </div>
      ) : (
        <div
          className={css({
            maxWidth: '1/4',
          })}
        >
          <Link href="/">
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
              src={media.media_url}
              alt="Choisir cette image pour placer un évenement"
            />
          </Link>
        </div>
      )}
    </>
  )
}

Post.layout = (page: ReactNode) => <AuthLayout children={page} />
export default Post
