import {combineReducers} from 'redux'

import userReducer from './userReducer'
import brandReducer from './brandReducer'
import uomReducer from './uomReducer'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import rawMaterialReducer from './rawMaterialReducer'
import stockRawMaterialReducer from './stokRawMaterialReducer'
import stockProdukReducer from './stokProdukReducer'


const allReducer = combineReducers({
    userReducer,
    brandReducer,
    uomReducer,
    productReducer,
    categoryReducer,
    rawMaterialReducer,
    stockRawMaterialReducer,
    stockProdukReducer
})

export default allReducer