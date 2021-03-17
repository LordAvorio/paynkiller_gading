import React from 'react'
import { Switch, Route } from 'react-router-dom'


// import Pages
import RegisterScreen from './pages/registerscreen'
import HomeScreen from './pages/homescreen'
import ProfileScreen from './pages/ProfileScreen'
import Category from './pages/categoryAdmin'

export default function App() {

  return (
    <div>
      <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/admin-category' component={Category}/>
      </Switch>
    </div>
  )
}
