export function getOrder() {
    return JSON.parse(localStorage.getItem('order') || "[]");
}

export function removeOrder() {
    localStorage.removeItem('order');
}

export function setProductsForOrder(products) {
    let order = getOrder();
    localStorage.setItem('products', JSON.stringify(products));
}

export function getProducts() {
    return JSON.parse(localStorage.getItem('products') || "[]");
}

