import { Box, Skeleton } from '@mui/material'
import React from 'react'

const SkeletonProductDetails = () => {
  return (
    <Box className='d-flex'>
      <Box className='mx-3'>
        <Skeleton variant="rounded" width={500} height={600} />
      </Box>
      <Box>
        <Skeleton variant="text" width={710} height={60} />
        <Skeleton variant="text" width={710} height={80} />
        <Skeleton variant="text" width={710} height={180} />
        <Skeleton variant="rounded" width={710} height={120} />
      </Box>
    </Box>
  )
}

export default SkeletonProductDetails;