import { Vite } from '#start/view'
import type { Children } from '@kitajs/html'

interface LayoutProps {
  children: Children
}

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Influnation</title>
          <Vite.Entrypoint entrypoints={['resources/css/app.css', 'resources/js/app.js']} />
        </head>
        <body>{children}</body>
      </html>
    </>
  )
}
