import { ark } from '@ark-ui/react/factory'
import { styled } from '#style/jsx'
import { button } from '#style/recipes'
import type { ComponentProps } from '#style/types'

export type ButtonProps = ComponentProps<typeof Button>
export const Button = styled(ark.button, button)
