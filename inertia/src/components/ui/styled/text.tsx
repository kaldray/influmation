import { styled } from '#style/jsx'
import { type TextVariantProps, text } from '#style/recipes'
import type { ComponentProps, StyledComponent } from '#style/types'

type ParagraphProps = TextVariantProps & { as?: React.ElementType }

export type TextProps = ComponentProps<typeof Text>
export const Text = styled('p', text) as StyledComponent<'p', ParagraphProps>
