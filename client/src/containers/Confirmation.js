import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getOrder } from "../store/OrderStore";

class Confirmation extends Component {
    constructor() {
        super();
        this.state = {order: getOrder()};
    }
    render() {
        const {name, products, email} = this.state.order
        return (
            <div>
                <h2>Du har gjort en beställning av:</h2> 
                {products.map(item => <div>{item.name}</div>)}

                <div>Fakturan kommer skickas till e-post {email}</div>
            </div>
        );
    }
}

Confirmation.propTypes = {

};

export default Confirmation;