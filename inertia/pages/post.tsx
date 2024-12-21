import { AuthLayout } from '#ui/components/Layout'
import { type FormEvent, type ReactNode } from 'react'
import { css } from '#style/css'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type PostController from '#post/post_controller'
import { Field } from '#ui/components/ui/field'
import { Button } from '#ui/components/ui/button'
import { HStack, VStack } from '#style/jsx'
import { router, usePage } from '@inertiajs/react'

function handleSubmit(e: FormEvent<HTMLFormElement>, id: string) {
  e.preventDefault()
  const form = new FormData(e.currentTarget)
  router.post('/post', {
    message_to_listen: form.get('message_to_listen'),
    message_to_sent: form.get('message_to_sent'),
    post_id: id,
  })
}

const Post = ({ media }: InferPageProps<PostController, 'show'>) => {
  const { errors } = usePage().props
  console.log(errors)
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
                <Field.Label htmlFor="message_to_listen">
                  A quel commentaire souhaitez vous répondre ?
                </Field.Label>
                <Field.Input
                  name="message_to_listen"
                  id="message_to_listen"
                  type="text"
                  required
                  placeholder="Je participe"
                />
                <Field.HelperText>
                  Le commentaire entré sera pris en compte tel quel.
                </Field.HelperText>
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor="message_to_sent">
                  Choisir le message à envoyer en réponse.
                </Field.Label>
                <Field.Textarea
                  name="message_to_sent"
                  id="message_to_sent"
                  resize={'none'}
                  rows={4}
                  required
                  placeholder="Votre participation à bien été pris en compte"
                />
                <Field.HelperText>
                  Le commentaire entré sera pris en compte tel quel.
                </Field.HelperText>
              </Field.Root>
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
