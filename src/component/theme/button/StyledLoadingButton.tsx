import { LoadingButton } from '@mui/lab'
import React from 'react'

const StyledLoadingButton = ({children, ...props} : any) => {
  return (
    <LoadingButton
    {...props}
  >
    {children}
  </LoadingButton>
  )
}

export default StyledLoadingButton