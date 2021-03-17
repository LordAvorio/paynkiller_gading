const INITIAL_STATE = {
    cate: []
}

export const categoryReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_CATEGORY':
            return {
                cate: action.payload
            }
        default:
            return state
    }
}