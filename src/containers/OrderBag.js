import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as OrderStore from '../store/OrderStore';

class OrderBag extends Component {
    constructor() {
        super();
        this.state = {products: OrderStore.getProducts()};
    }

    removeProduct(productId) {
        const updatedProducts = this.state.products.filter(item => item.id !== productId);
        this.setState({
            products: updatedProducts
        });
        OrderStore.setProductsForOrder(updatedProducts);
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <th>Produkt</th>
                        <th>Pris</th>
                        <th>Ta bort</th>
                    </tr>
                    {this.state.products.map(product => 
                        <tr>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                <button onClick={() => this.removeProduct(product.id)}>
                                    <span className="glyphicon glyphicon-remove-circle" />
                                    Ta bort
                                </button>
                            </td>
                        </tr>
                    )}
                </table>
                <a href="/payment" className="btn btn-primary">Till betalning</a>
            </div>
        );
    }
}

OrderBag.propTypes = {

};

export default OrderBag;