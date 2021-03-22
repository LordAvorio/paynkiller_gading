import {combineReducers} from 'redux'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import {categoryReducer} from './categoryReducer'

const allReducer = combineReducers({
    userReducer,
    cartReducer,
    categoryReducer
})

export default allReducer