const baseUrl = 'http://localhost:4200/';
export function getProducts() {
    return fetch(baseUrl + 'products', {'Access-Control-Allow-Origin': baseUrl})
            .then(res => res.json())
            .catch(error => console.error("error", error));
}

export function createOrder(order) {
    return fetch(baseUrl + 'order', {
                'Access-Control-Allow-Origin': baseUrl, 
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => {
                console.log("createorder api response", res);
                return res.json();
            }).catch(error => console.error("could not save order", error));
}
    
