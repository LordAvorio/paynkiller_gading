import React from 'react'
import { Switch, Route } from 'react-router-dom'


// import Pages
import LoginScreen from './pages/loginscreen'
import HomeScreen from './pages/homescreen'

export default function App() {

  return (
    <div>
      <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/login' component={LoginScreen} />
      </Switch>
    </div>
  )
}
