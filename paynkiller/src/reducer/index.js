import {combineReducers} from 'redux'
import userReducer from './userReducer'
import {categoryReducer} from './categoryReducer'

const allReducer = combineReducers({
    userReducer,
    categoryReducer
})

export default allReducer