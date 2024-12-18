import type { PropsWithChildren } from 'react'
import { Alert } from './ui/alert'
import { cva, cx, type RecipeVariantProps } from '#style/css'

const background = cva({
  base: { marginBlock: '3.5' },
  variants: {
    type: {
      succes: { backgroundColor: 'greenyellow' },
      error: { backgroundColor: 'red' },
    },
  },
})

type FlashVariants = RecipeVariantProps<typeof background>

type FlashProps = FlashVariants & PropsWithChildren & { type: 'succes' | 'error' | undefined }

export function Flash({ children, type }: FlashProps) {
  if (children == undefined) {
    return null
  }

  return (
    <>
      <Alert.Root bgColor={type === 'error' ? 'red.3' : 'green.500'} marginBlock="3.5">
        <Alert.Title>{children}</Alert.Title>
      </Alert.Root>
    </>
  )
}
