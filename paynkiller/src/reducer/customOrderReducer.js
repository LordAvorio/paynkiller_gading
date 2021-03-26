let INITIAL_STATE = {
    dataCustomOrder: [],
    dataCustomOrderDetail: [],
    errLogin: "",
    materialsinCart: [],
    materialsCheckout: []
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
        case 'MATERIALS_CART':
            return {
                ...state,
                materialsinCart: action.payload
            }
        case 'MATERIALS_CHECKOUT':
            return {
                ...state,
                materialsCheckout: action.payload
            }
        default:
            return state
    }
}

export default customOrderReducer