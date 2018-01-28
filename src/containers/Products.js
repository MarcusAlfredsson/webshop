import React, { Component } from 'react';
import Product from '../components/Product';
import { getProducts } from "../Api";
import * as OrderStore from '../store/OrderStore';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            orderedProducts: OrderStore.getProducts()
        };
    }

    componentWillMount()  {
        this.setState({
            products: getProducts()
        });
    }

    componentWillUnmount() {
        console.log("will unmount")
        OrderStore.setProductsForOrder(this.state.orderedProducts);
    }

    
    addProduct(product) {
        console.log("Product with id: " + product + "was added to order");
        var isProductAdded = this.state.orderedProducts.find((item) => item.id === product.id);
        if (isProductAdded === undefined) {
            const updatedProducts = [...this.state.orderedProducts, product]
            this.setState({
                orderedProducts: updatedProducts
            });
            OrderStore.setProductsForOrder(updatedProducts);
        }
    }

    render() {
        return (
            <div>
                <a href="/OrderBag" className="glyphicon glyphicon-shopping-cart link" style={{color: "black"}}>{this.state.orderedProducts.length}</a>
                {this.state.products.map((product) => <Product key={product.id} product={product} onAdd={(product) => this.addProduct(product)}/>) }
            </div>
        );
    }
}


export default Products;