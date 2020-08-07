import React, { useReducer, createContext, useEffect, useContext } from 'react'
import handleAsync from './utils/handleAsync'
import Loader from './components/Loader'
import AUTH_SERVICE from './services/auth_service'

export const AuthStateContext = createContext({})

const initialState = {
  status: 'pending',
  error: null,
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        status: 'success',
        error: null,
        user: action.payload
      }

    case 'LOGIN':
      return {
        status: 'success',
        error: null,
        user: action.payload.user
      }

    case 'LOGOUT':
      return {
        status: 'success',
        error: null,
        user: null
      }

    default:
      return initialState
  }
}

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    getUser()
  }, [])

  const [state, dispatch] = useReducer(reducer, initialState)
  const isPending = state.status === 'pending'

  async function getUser() {
    const response = await handleAsync(AUTH_SERVICE.CURRENT_USER)
    if (response.msg === 'Unauthorized, Missing token') {
      dispatch({ type: 'SET_USER', payload: null })
    } else {
      dispatch({ type: 'SET_USER', payload: response.user })
    }
  }

  return (
    <AuthStateContext.Provider value={[state, dispatch]}>{isPending ? <Loader /> : children}</AuthStateContext.Provider>
  )
}

export const useAuth = () => useContext(AuthStateContext)