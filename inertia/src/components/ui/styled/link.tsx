import { ark } from '@ark-ui/react/factory'
import { styled } from '#style/jsx'
import { link } from '#style/recipes'
import type { ComponentProps } from '#style/types'

export type LinkProps = ComponentProps<typeof Link>
export const Link = styled(ark.a, link)
