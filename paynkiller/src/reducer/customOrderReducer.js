let INITIAL_STATE = {
    dataCustomOrder: [],
    dataCustomOrderDetail: [],
    errLogin: ""
}

const customOrderReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'GET_CUSTOM_ORDER_ALL':
            return{
                ...state,
                dataCustomOrder: action.payload
            }
        case 'GET_CUSTOM_ORDER_DETAIL':
            return{
                ...state,
                dataCustomOrderDetail: action.payload
            }
        case 'CUSTOM_ORDER_ERR':
            return {
                ...state,
                errLogin: action.payload
            }
        case 'REMOVE_ERR':
            return {
                ...state,
                errLogin: ""
            }
        default:
            return state
    }
}

export default customOrderReducer