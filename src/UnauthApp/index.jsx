import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


import Login from './Login'
import Sign from './Sign'

function UnauthApp() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign" component={Sign} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default UnauthApp