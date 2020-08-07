import React from 'react'
import { Box } from '@chakra-ui/core'

export default function PageSection({ children }) {
  return (
    <Box as="section" w="85vw" h="100vh" p={10} position="fixed" right="0" boxSizing="border-box" color="graypf.500">
      {children}
    </Box>
  )
}
