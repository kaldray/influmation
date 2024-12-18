import { ark } from '@ark-ui/react/factory'
import { styled } from '#style/jsx'
import { input } from '#style/recipes'
import type { ComponentProps } from '#style/types'

export type InputProps = ComponentProps<typeof Input>
export const Input = styled(ark.input, input)
