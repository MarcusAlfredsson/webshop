import React, { Component } from 'react';
import Product from './Product';
import { getProducts } from '../Api';
import * as OrderStore from '../store/OrderStore';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            orderedProducts: OrderStore.getOrderedProducts(),
            error: null,
        };
    }

    componentWillMount()  {
        getProducts().then(res => this.setState({
            products: res
        })).catch(error => this.setState({error: 'Fel vid hämtning av produkter, vänligen testa senare!'}));
    }

    componentDidMount() {
        // This will cause rerender!!!!
        this.updateOrderBag(this.state.orderedProducts.length);
    }

    updateOrderBag(numberOfProducts) {
        document.getElementById('orderBagTotal').innerHTML = numberOfProducts;
    }
    
    addProduct(product) {
        var isProductAdded = this.state.orderedProducts.find((item) => item.id === product.id);
        if (isProductAdded === undefined) {
            const updatedProducts = [...this.state.orderedProducts, product]
            this.updateOrderBag(updatedProducts.length);
            this.setState({
                orderedProducts: updatedProducts
            });
            OrderStore.setProductsForOrder(updatedProducts);
        }
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    {this.state.error}
                </div>
            );
        }

        return (
            <div className='list-group'>
                {this.state.products.map((product) => <Product key={product.id} product={product} onAdd={(product) => this.addProduct(product)}/>) }
            </div>
        );
    }
}


export default Products;