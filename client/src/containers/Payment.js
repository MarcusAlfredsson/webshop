import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProducts, setOrder } from "../store/OrderStore";
import { createOrder } from "../Api";
import {BrowserRouter as router} from 'react-router-dom';

class Payment extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            acceptedTerms: false,
            name: null
        }
    }

    handleChange(event){
        const {name, value} = event.target;
        if (name === "email") {
            this.setState({
                email: value
            });
        } else if (name === "terms") {
            this.setState({
                acceptedTerms: !this.state.acceptedTerms
            });
        } else if (name === "name") {
            this.setState({
                name: value
            });
        }
    }

    confirmOrder() {
        if (!this.state.acceptedTerms) {
            return;
        }
        const products = getProducts();
        // const price = products.reduce((a, b) => {return a.price + b.price}, 0);
        let price = 0;
        for(var i = 0; i < products.length; i++) {
            price = price + products[i].price;
        }
        let order = {
            email: this.state.email,
            name: this.state.name,
            products,
            price
        }

        createOrder(order).then(savedOrder => {
            setOrder(savedOrder);
            console.log("savedOrder", savedOrder);
            this.props.history.push("/confirmation");

        }).catch(error => console.error("couldnt save order", error));

    }

    render() {
        return (
            <div>
                <strong>Betalning sker med faktura, ange e-post för faktura</strong>
                <label> Namn:
                    <input type="input" name="name" onChange={e => this.handleChange(e)} />
                </label>
                <label> E-post:
                    <input type="email" name="email" onChange={e => this.handleChange(e)} />
                </label>
                <label>
                    Acceptera krav:
                    <input type="checkbox" name="terms" onChange={e => this.handleChange(e)} value={this.state.acceptedTerms} />
                </label>
                <button className="btn btn-primary" disabled={!this.state.acceptedTerms} onClick={() => this.confirmOrder()} > Bekräfta köp</button>
            </div>
        );
    }
}

Payment.propTypes = {

};

export default Payment;