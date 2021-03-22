import {combineReducers} from 'redux'

import userReducer from './userReducer'
import cartReducer from './cartReducer'
import {categoryReducer} from './categoryReducer'
import brandReducer from './brandReducer'
import uomReducer from './uomReducer'
import productReducer from './productReducer'
import rawMaterialReducer from './rawMaterialReducer'
import stockRawMaterialReducer from './stokRawMaterialReducer'
import stockProdukReducer from './stokProdukReducer'

const allReducer = combineReducers({
    userReducer,
    cartReducer,
    categoryReducer,
    brandReducer,
    uomReducer,
    productReducer,
    rawMaterialReducer,
    stockRawMaterialReducer,
    stockProdukReducer
})

export default allReducer