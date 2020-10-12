import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Menu from '../components/Menu'
import routes from './routes'

function AuthApp(props) {
  const setRoutes = () =>  routes.map(({ path, Component }) => <Route {...props}  key={path} exact path={path} component={Component} />)

  return (
    <>
      <Menu/>
      <Switch>
        {setRoutes()}
        <Redirect to="/app/header" />
      </Switch>
    </>
  )
}

export default AuthApp