import React, { Component } from 'react';
import Product from '../components/Product';
import { getProducts } from "../Api";

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }

    componentWillMount()  {
        this.setState({
            products: getProducts()
        });
    }

    render() {
        return (
            <div>
                {this.state.products.map((product) => <Product key={product.id} product={product} onAdd={this.props.addProduct}/>) }
            </div>
        );
    }
}


export default Products;