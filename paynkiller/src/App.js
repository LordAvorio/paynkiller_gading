import React from 'react'
import { Switch, Route } from 'react-router-dom'

// import Pages
import RegisterScreen from './pages/registerscreen'
import HomeScreen from './pages/homescreen'
import ProfileScreen from './pages/ProfileScreen'
import FPassScreen from './pages/ForgotPassScreen'
import LoginScreen from './pages/loginscreen'
import Category from './pages/categoryAdmin'

import {useDispatch} from 'react-redux'

//import actions
import { keeplogin } from './action'
import ChangePassScreen from './pages/changepassScreen'

export default function App() {
  const dispatch = useDispatch()
  useDispatch(keeplogin())
  React.useEffect(()=> {
      dispatch(keeplogin())
  },[])

  return (
    <div>
      <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/admin-category' component={Category}/>
        <Route path='/login' component={LoginScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/forgotpass' component={FPassScreen} />
        <Route path='/changePass' component={ChangePassScreen} />
      </Switch>
    </div>
  )
}
