import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { Box, Image } from '@chakra-ui/core'
import { useAuth } from '../AuthContext'
import handleAsync from '../utils/handleAsync'
import routes from '../AuthApp/routes'
import AUTH_SERVICE from '../services/auth_service'

export default function Menu() {
  const [, dispatch] = useAuth()

  const logout = async () => {
    await handleAsync(AUTH_SERVICE.LOGOUT)
    dispatch({ type: 'LOGOUT' })
  }

  const setLinks = () =>
    routes.map(({ label, path }) => (
      <Box key={path} fontSize={['md', 'lg', 'lg', 'xl']} mb={[3, 3, 5, 10]}>
        <NavLink activeStyle={{ fontWeight: 'bold', color: '#003366' }} exact to={path}>
          {label}
        </NavLink>
      </Box>
    ))

  const setBottomLinks = () =>
    routes.slice(routes.length - 2).map(({ label, path }) => (
      <Box key={path} fontSize={['md', 'lg', 'lg', 'xl']} mb={[3, 3, 5, 10]}>
        <NavLink activeStyle={{ fontWeight: 'bold', color: '#003366' }} to={path}>
          {label}
        </NavLink>
      </Box>
    ))

  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      flexDirection="column"
      boxSizing="border-box"
      py={10}
      px={[5, 5, 10, 20]}
      h="100vh"
      w="15vw"
      position="fixed"
      left="0"
      textAlign="center"
      boxShadow="xl"
    >

      <Box position="fixed" >
        {setLinks()}
        <Box cursor="pointer" onClick={logout} fontSize={['md', 'lg', 'lg', 'xl']} mb={[3, 3, 5, 10]}>
          Logout
        </Box>
      </Box>
    </Box>
  )
}