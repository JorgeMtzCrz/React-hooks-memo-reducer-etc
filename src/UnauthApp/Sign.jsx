import React, { useEffect } from 'react'
import {  Heading, Input, InputGroup, Button, Box } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import AUTH_SERVICE from '../services/auth_service'
import Swal from 'sweetalert2'

export default function SignUp({history}) {
  const [form, handleInput] = useForm()
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

  useEffect(() => {
    if (loggedUser) return history.push('/todo')

  }, [loggedUser, history])
  const handleSubmit = e => {
    e.preventDefault()
    AUTH_SERVICE.SIGNUP(form)
      .then(response => {
        history.push('/')
        }
      )
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: err.response.data.err.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
          }).then((result) => {
            window.location.reload('/todo') 
          })
      })
  }


  return (
    <Box as="main" display="flex" alignItems="center" alignContent="center" flexDirection="column" justifyContent="center" boxSizing="border-box" h="85vh" w="100%">
    
          <Heading as="h3" size="lg" mb={5}>
              Sign Up
          </Heading>
      <Box as="form" w="100%" alignItems="center" alignContent="center" display="flex" flexDirection="column">
          
          <InputGroup  w="30%" size="lg" mb={3} >
                <Input
                  color="gray"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                />
          </InputGroup>
          <InputGroup  w="30%" size="lg" mb={3} >
                <Input
                  color="gray"
                  type="password"
                  name="password"
                  onChange={handleInput}
                  placeholder="Password"
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
            Sign Up
          </Button>
          <Box color="gray" mt={6} alignSelf="center">
            <Link to="/">or Login</Link>
          </Box>
      </Box>
      
    </Box>
  )
}