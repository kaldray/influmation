import type ConversationController from '#conversation/conversation_controller'
import type { MessagesInformations } from '#conversation/conversation_service'
import { css } from '#style/css'
import { token } from '#style/tokens'
import { AuthLayout } from '#ui/components/Layout'
import { Link } from '#ui/components/ui/link'
import { Text } from '#ui/components/ui/text'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link as InertiaLink, usePage } from '@inertiajs/react'
import { type ReactNode } from 'react'

type MessagePreviewProps = MessagesInformations & {
  user:
    | {
        [x: string]: any
      }
    | undefined
}

const Conversation = ({ messages, user }: InferPageProps<ConversationController, 'index'>) => {
  return (
    <>
      <h1 className={css({ marginTop: '3.5' })}>Vos conversations</h1>
      <section
        className={css({
          my: '5',
          display: 'flex',
          columnGap: '5',
          rowGap: '16',
          maxH: '85vh',
        })}
      >
        <ul
          className={css({
            display: 'flex',
            flexDirection: 'column',
            maxW: '1/4',
            alignItems: 'start',
            gap: '0',
            overflowY: 'scroll',
            overflowX: 'hidden',
            maxHeight: 'var(--max-height)',
          })}
        >
          {messages.map((data, index) => (
            <MessagePreviewList {...data} key={data.id + index} user={user} />
          ))}
        </ul>
        <MessagesBox />
      </section>
    </>
  )
}

const MessagePreviewList = ({ from, to, message, user, reactions }: MessagePreviewProps) => {
  const url = usePage().url
  const senderId = from.username === user?.username ? to.data?.at(0)?.id : from.id
  const currentUrl = url === `/conversation/${senderId}`
  return (
    <li
      className={css({
        width: '100%',
        minH: '54',
        transitionDuration: 'faster',
        transitionProperty: 'background-color',
        _hover: { bg: 'bg.muted', cursor: 'pointer' },
      })}
    >
      <Link
        asChild={true}
        data-active={currentUrl}
        className={css({
          '&[data-active=true]': { bg: 'bg.emphasized' },
        })}
        width={'full'}
      >
        <InertiaLink
          href={`/conversation/${senderId}`}
          except={['messages']}
          prefetch={true}
          preserveScroll={true}
        >
          <div className={css({ m: '1.5', w: 'full' })}>
            <Text
              as="p"
              fontWeight="bold"
              size="md"
              textOverflow="ellipsis"
              textWrap="nowrap"
              overflowX="hidden"
            >
              {from?.username === user?.username ? to.data?.at(0)?.username : from?.username}
            </Text>
            {reactions?.data.length > 0 &&
            reactions.data.at(0)?.users.at(0)?.username !== user?.username ? (
              <Text as="p" size="xs" textOverflow="ellipsis" textWrap="nowrap" overflowX="hidden">
                A réagie avec {reactions.data.at(0)?.emoji}
              </Text>
            ) : (
              <Text as="p" size="xs" textOverflow="ellipsis" textWrap="nowrap" overflowX="hidden">
                {from?.username === user?.username ? 'Vous: ' + message : message}
              </Text>
            )}
          </div>
        </InertiaLink>
      </Link>
    </li>
  )
}

const MessagesBox = () => {
  const { user, privateMessages } = usePage<InferPageProps<ConversationController, 'index'>>().props
  return (
    <>
      <section
        style={{ '--max-height': `calc(100dvh - ${token('sizes.12')})` }}
        className={css({
          maxHeight: '100%',
          overflowY: 'scroll',
          flexGrow: '1',
          position: 'sticky',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5',
          py: '1.5',
          pr: '2',
        })}
      >
        {privateMessages?.map((d, i) => {
          const senderId = d.from.username === user?.username
          return (
            <div
              className={css({
                borderRadius: 'l2',
                backgroundColor: 'colorPalette.emphasized',
                alignSelf: senderId ? 'flex-end' : 'flex-start',
                padding: '1.5',
              })}
              key={d.created_time + i}
            >
              <Text color={'white.a12'} fontSize={'small'}>
                {d.message}
              </Text>
            </div>
          )
        })}
      </section>
    </>
  )
}

Conversation.layout = (page: ReactNode) => <AuthLayout children={page} />

export default Conversation
