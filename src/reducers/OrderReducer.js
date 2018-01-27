import {ADD_PRODUCT_TO_ORDER, REMOVE_PRODUCT_FROM_ORDER} from '../actions/actions';

const initialState = {
    order: [],
    orderCount: 0
};

export default function orderReducer(state, action) {
    switch(action.type) {
        case ADD_PRODUCT_TO_ORDER:
            return Object.assign({}, state, {
                order: [...state.order, product],               
                orderCount: state.order.length + 1
            });
        case REMOVE_PRODUCT_FROM_ORDER:
            return Object.assign({}, state, {
                order: state.order.filter(item => item.id !== action.product.id),               
                orderCount: state.order.length - 1
            });
        default:
            return state;
    }
}