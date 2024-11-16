import { forwardRef } from 'react'
import { Center, styled } from '#style/jsx'
import { Button as StyledButton, type ButtonProps as StyledButtonProps } from './styled/button'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends StyledButtonProps, ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { loading, disabled, loadingText, children, ...rest } = props

  const trulyDisabled = loading || disabled

  return (
    <StyledButton disabled={trulyDisabled} ref={ref} {...rest}>
      {loading && !loadingText ? (
        <>
          <ButtonSpinner />
          <styled.span opacity={0}>{children}</styled.span>
        </>
      ) : loadingText ? (
        loadingText
      ) : (
        children
      )}
    </StyledButton>
  )
})

Button.displayName = 'Button'
