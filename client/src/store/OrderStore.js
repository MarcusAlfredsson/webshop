export function getOrder() {
    return JSON.parse(localStorage.getItem('order') || '[]');
}

export function removeOrder() {
    localStorage.removeItem('order');
}

export function setOrder(order) {
    localStorage.setItem('order', JSON.stringify(order));
}

export function setProductsForOrder(products) {
    localStorage.setItem('orderedProducts', JSON.stringify(products));
}

export function getOrderedProducts() {
    return JSON.parse(localStorage.getItem('orderedProducts') || '[]');
}

export function removeOrderedProducts() {
    localStorage.removeItem('orderedProducts');
}
