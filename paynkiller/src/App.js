import React from 'react'
import { Switch, Route } from 'react-router-dom'


// import Pages
import LoginScreen from './pages/loginscreen'
import HomeScreen from './pages/homescreen'
import DashboardScreen from './pages/dashboard'
import MasterBrandScreen from './pages/masterBrands'
import MasterUomScreen from './pages/masterUom'
import MasterRawMaterialScreen from './pages/masterRawMaterial'
import MasterProductScreen from './pages/masterProduct'
import ManagementStockProductScreen from './pages/stokProduk'
import ManagementStockRawMaterialScreen from './pages/stokRawMaterial'

export default function App() {

  return (
    <div>
      <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/login' component={LoginScreen} />
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
