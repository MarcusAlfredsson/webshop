import React, { Component } from 'react';
import * as OrderStore from '../store/OrderStore';

class OrderBag extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            totalPrice: 0
        };
    }

    componentWillMount() {
        const products = OrderStore.getOrderedProducts()
        this.setState({
            products,
            totalPrice: this.countTotalPrice(products)
        })
        
    }

    removeProduct(productId) {
        const updatedProducts = this.state.products.filter(item => item.id !== productId);
        this.setState({
            products: updatedProducts, 
            totalPrice: this.countTotalPrice(updatedProducts)
        });
        OrderStore.setProductsForOrder(updatedProducts);
    }

    countTotalPrice(products) {
        let price = 0;
        for(var i = 0; i < products.length; i++) {
            price = price + products[i].price;
        }
        return price
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th>Pris</th>
                            <th>Ta bort</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map(product => 
                        <tr key={product.id}>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.price} {product.currency}
                            </td>
                            <td>
                                <a onClick={() => this.removeProduct(product.id)}>
                                    <span className='glyphicon glyphicon-remove-circle' />
                                    Ta bort
                                </a>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td>
                            Totaltpris:
                        </td>
                        <td>
                            {this.state.totalPrice} SEK
                        </td>
                        <td />
                    </tr>
                    </tbody>
                </table>
                <a href='/payment' className='btn btn-primary'>Till betalning</a>
            </div>
        );
    }
}

export default OrderBag;