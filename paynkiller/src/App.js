import React from 'react'
import { Switch, Route } from 'react-router-dom'

// import Pages
import RegisterScreen from './pages/registerscreen'
import HomeScreen from './pages/homescreen'
import ProfileScreen from './pages/ProfileScreen'
import CartScreen from './pages/cartscreen'
import FPassScreen from './pages/ForgotPassScreen'
import LoginScreen from './pages/loginscreen'
// import CartScreen from './pages/cartscreen'
import ChangePassScreen from './pages/changepassScreen'
import DetailProdukScreen from './pages/detailProduckScreen'
import MasterCategory from './pages/masterCategory'
// import CartScreen from './pages/cartscreen'
import DashboardScreen from './pages/dashboard'
import MasterBrandScreen from './pages/masterBrands'
import MasterUomScreen from './pages/masterUom'
import MasterRawMaterialScreen from './pages/masterRawMaterial'
import MasterProductScreen from './pages/masterProduct'
import ManagementStockProductScreen from './pages/stokProduk'
import ManagementStockRawMaterialScreen from './pages/stokRawMaterial'

import {useDispatch} from 'react-redux'



//import actions
import { keeplogin } from './action'

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
        <Route path='/cart' component={CartScreen}/>
        <Route path='/login' component={LoginScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/forgotpass' component={FPassScreen} />
        <Route path='/changePass' component={ChangePassScreen} />
        <Route path='/detailproduk' component={DetailProdukScreen} />
        <Route path='/admin/master/category' component={MasterCategory}/>
        <Route path='/admin/dashboard' component={DashboardScreen} />
        <Route path='/admin/master/brand' component={MasterBrandScreen} />
        <Route path='/admin/master/uom' component={MasterUomScreen} />
        <Route path='/admin/master/rawmaterial' component={MasterRawMaterialScreen} />
        <Route path='/admin/master/product' component={MasterProductScreen} />
        <Route path='/admin/stock/rawmaterial' component={ManagementStockRawMaterialScreen} />
        <Route path='/admin/stock/product' component={ManagementStockProductScreen} />
      </Switch>
    </div>
  )
}
