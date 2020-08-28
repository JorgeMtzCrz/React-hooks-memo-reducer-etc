import React from 'react'
import { Box } from '@chakra-ui/core'

export default function PageSection({ children }) {
  return (
    <Box as="section" w="85vw" h="100%" p={10} position="absolute" right="0" color="gray.500">
      {children}
    </Box>
  )
}
