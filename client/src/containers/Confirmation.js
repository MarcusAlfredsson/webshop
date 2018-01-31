import React, { Component } from 'react';
import { getOrder } from '../store/OrderStore';

class Confirmation extends Component {
    constructor() {
        super();
        this.state = {order: getOrder()};
    }
    render() {
        const {orderId, products, email} = this.state.order
        return (
            <div>
                <h2>Du har gjort beställning med ordernummer: {orderId} </h2>
                <h3>Beställning består av produkterna:</h3> 
                <ul>
                    {products.map(item => <li>{item.name}</li>)}
                </ul>

                <div>Fakturan kommer skickas till e-post {email}</div>
            </div>
        );
    }
}

export default Confirmation;