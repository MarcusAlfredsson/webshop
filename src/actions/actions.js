export const ADD_PRODUCT_TO_ORDER = 'ADD_PRODUCT_TO_ORDER';
export const REMOVE_PRODUCT_FROM_ORDER = 'REMOVE_PRODUCT_FROM_ORDER';

export function addProductToOrder(product) {
    return {
        type: ADD_PRODUCT_TO_ORDER,
        product
    };
}

export function removeProductFromOrder(id) {
    return {
        type: REMOVE_PRODUCT_FROM_ORDER,
        id
    };
}