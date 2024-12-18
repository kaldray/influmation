import { AuthLayout } from '#ui/components/Layout'
import { type FormEvent, type ReactNode } from 'react'
import { css } from '#style/css'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type PostController from '#post/post_controller'
import { Field } from '#ui/components/ui/field'
import { Button } from '#ui/components/ui/button'
import { HStack, VStack } from '#style/jsx'
import { router } from '@inertiajs/react'

function handleSubmit(e: FormEvent<HTMLFormElement>, id: string) {
  e.preventDefault()
  const form = new FormData(e.currentTarget)
  router.post('/post', { message: form.get('message'), post_id: id })
}

const Post = ({ media }: InferPageProps<PostController, 'show'>) => {
  return (
    <>
      <h1 className={css({ marginTop: '3.5' })}>Votre publication</h1>
      <section
        className={css({
          display: 'flex',
          flexFlow: 'wrap',
          gap: '3.5',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            flex: '1 1 40%',
            mdDown: {
              flex: '1 1 100%',
            },
          })}
        >
          <Media media={media} />
        </div>
        <div
          className={css({
            flex: '1 1 40%',
            mdDown: {
              flex: '1 1 100%',
            },
          })}
        >
          <form onSubmit={(e) => handleSubmit(e, media.id)}>
            <VStack marginBlockEnd={'3'}>
              <Field.Root>
                <Field.Label htmlFor="message">
                  A quel commentaire souhaitez vous répondre ?
                </Field.Label>
                <Field.Input
                  name="message"
                  id="message"
                  type="text"
                  required
                  placeholder="Je participe"
                />
              </Field.Root>
              <Field.HelperText>
                Le commentaire entré sera pris en compte tel quel.
              </Field.HelperText>
            </VStack>
            <HStack justifyContent={'center'}>
              <Button>Envoyer</Button>
            </HStack>
          </form>
        </div>
      </section>
    </>
  )
}

function Media({ media }: InferPageProps<PostController, 'show'>) {
  return (
    <>
      {'thumbnail_url' in media ? (
        <div>
          <img
            className={css({
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              aspectRatio: '4/5',
            })}
            src={media.thumbnail_url}
            alt="Choisir cette image pour placer un évenement"
          />
        </div>
      ) : (
        <div>
          <img
            className={css({
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              aspectRatio: '4/5',
            })}
            src={media.media_url}
            alt="Choisir cette image pour placer un évenement"
          />
        </div>
      )}
    </>
  )
}

Post.layout = (page: ReactNode) => <AuthLayout children={page} />
export default Post
