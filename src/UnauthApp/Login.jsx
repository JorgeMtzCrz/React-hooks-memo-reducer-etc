import React, {  useEffect, useState } from 'react'
import {  Heading, Input, InputGroup, Button, Box, useToast } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import AUTH_SERVICE from '../services/auth_service'
import Swal from 'sweetalert2'
import handleAsync from '../utils/handleAsync'
import { useAuth } from '../AuthContext.jsx'


export default function Login({history}) {
  const toast = useToast()
  const [, dispatch] = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, handleInput] = useForm()


  const handleSubmit = async e => {
    e.preventDefault()

    setLoading(true)

    const data = {
      email: form.email,
      password: form.password
    }

    const { user } = await handleAsync(() => AUTH_SERVICE.LOGIN(data))
    setLoading(false)

    if (user) {
      dispatch({ type: 'LOGIN', payload: { user } })
    } else {
      toast({
        position: 'top-right',
        title: 'Unauthorized',
        description: 'Email or password are incorrect.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  

  return (
    <Box as="main" display="flex" alignItems="center" alignContent="center" flexDirection="column" justifyContent="center" boxSizing="border-box" h="85vh" w="100%">
          <Heading as="h2"  size="lg" mb={5}>
              Welcome to Best Deal Denver CMS
          </Heading>
    
          <Heading as="h3" size="lg" mb={5}>
              Login
          </Heading>
      <Box as="form" w="100%" alignItems="center" alignContent="center" display="flex" flexDirection="column">
          
          <InputGroup  w="30%" size="lg" mb={3} >
                <Input
                  color="gray"
                  type="email"
                  placeholder="Email"
                  onChange={handleInput}
                  name="email"
                />
          </InputGroup>
          <InputGroup  w="30%" size="lg" mb={3} >
                <Input
                  color="gray"
                  type="password"
                  onChange={handleInput}
                  placeholder="Password"
                  name="password"
                />
          </InputGroup>
          <Button
          mt={5}
          onClick={handleSubmit}
          width="30%"
          size="lg"
          variantColor="red"
          variant="solid"
          type="submit"
          alignSelf="center"
          >
            Login
          </Button>
          <Box color="gray" mt={6} alignSelf="center">
            <Link to="/sign">or Sign Up</Link>
          </Box>
      </Box>
      
    </Box>
  )
}