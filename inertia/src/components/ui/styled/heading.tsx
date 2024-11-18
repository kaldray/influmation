import { styled } from '#style/jsx'
import { type TextVariantProps, text } from '#style/recipes'
import type { ComponentProps, StyledComponent } from '#style/types'

type TextProps = TextVariantProps & { as?: React.ElementType }

export type HeadingProps = ComponentProps<typeof Heading>
export const Heading = styled('h2', text, {
  defaultProps: { variant: 'heading' },
}) as StyledComponent<'h2', TextProps>
