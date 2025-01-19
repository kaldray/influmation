import { type ReactNode } from 'react'
import { AuthLayout } from '#ui/components/Layout'
import { css } from '#style/css'
import { Table } from '#ui/components/ui/table'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type MessageController from '#message/message_controller'
import { Link } from '#ui/components/ui/link'
import { Link as InertiaLink } from '@inertiajs/react'

const Dashboard = ({ messages }: InferPageProps<MessageController, 'index'>) => {
  return (
    <>
      <h1 className={css({ marginTop: '3.5' })}>Vue d'ensemble</h1>
      <section
        className={css({
          my: '5',
          display: 'flex',
          flexFlow: 'wrap',
          gap: '1.5',
          rowGap: '16',
          justifyContent: 'space-between',
        })}
      >
        <Table.Root variant={'outline'}>
          <Table.Head>
            <Table.Row>
              <Table.Header>Message à écouter</Table.Header>
              <Table.Header>Message à envoyer</Table.Header>
              <Table.Header>Actions</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {messages?.map(({ message_to_listen, message_to_sent, post_id }) => (
              <Table.Row key={post_id}>
                <Table.Cell>{message_to_listen}</Table.Cell>
                <Table.Cell>{message_to_sent}</Table.Cell>
                <Table.Cell>
                  <Link fontWeight={'bold'} asChild>
                    <InertiaLink href={`post/${post_id}`}>Voir le post</InertiaLink>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </section>
    </>
  )
}

Dashboard.layout = (page: ReactNode) => <AuthLayout children={page} />

export default Dashboard
