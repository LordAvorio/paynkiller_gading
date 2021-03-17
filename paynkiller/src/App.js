import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'


// import Pages
import LoginScreen from './pages/loginscreen'
import HomeScreen from './pages/homescreen'
import ProfileScreen from './pages/ProfileScreen'
import FPassScreen from './pages/ForgotPassScreen'

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
        <Route path='/login' component={LoginScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/forgotpass' component={FPassScreen} />
        <Route path='/changePass' component={ChangePassScreen} />
      </Switch>
    </div>
  )
}
