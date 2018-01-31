import React, { Component } from 'react';
import { getOrderedProducts, setOrder, removeOrderedProducts } from '../store/OrderStore';
import { createOrder } from '../Api';

class Payment extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            acceptedTerms: false,
            name: null,
            isFormValid: false,
            error: null
        }
    }

    handleChange(event){
        const {name, value} = event.target;
        if (name === 'email') {
            this.setState({
                email: value, 
                isFormValid: this.isFormValid(value, this.state.name, this.state.acceptedTerms)
            });
        } else if (name === 'terms') {
            this.setState({
                acceptedTerms: !this.state.acceptedTerms,
                isFormValid: this.isFormValid(this.state.email, this.state.name, !this.state.acceptedTerms)
                
            });
        } else if (name === 'name') {
            this.setState({
                name: value,
                isFormValid: this.isFormValid(this.state.email, value, !this.state.acceptedTerms)
            });
        }
    }

    isFormValid(email, name, acceptedTerms) {
        //TODO: change email validation for regex
        if (email === null || email === undefined || email.length < 1) {
            return false;
        } else if (name === null || name === undefined || name.length < 1) {
            return false;
        } else if (acceptedTerms === false) {
            return false;
        } 
        return true;
    }

    confirmOrder(e) {
        e.preventDefault();
        if (!this.state.acceptedTerms) {
            return;
        }
        const products = getOrderedProducts();
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
            removeOrderedProducts();
            console.log('savedOrder', savedOrder);
            this.props.history.push('/confirmation');

        }).catch(error => this.setState({error: 'Kunde inte genomföra order, var vänligen försök senare!'}));

    }

    render() {
        if (this.state.error) {
            return (
                <strong>{this.state.error}</strong>
            );
        }
        

        return (
            <form onSubmit={(e) => this.confirmOrder(e)}>
                <strong>Betalning sker med faktura, ange e-post för faktura</strong>
                <div className='form-group'>
                    <label htmlFor='paymentName'> 
                        Namn:
                    </label>
                    <input type='input' id='paymentName' name='name' className="form-control" onChange={e => this.handleChange(e)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='paymentEmail'>
                        E-post:
                    </label>
                    <input type='email' id='paymentEmail' name='email' className="form-control" onChange={e => this.handleChange(e)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='paymentTerms'>
                        Acceptera krav:
                    </label>
                    <input type='checkbox' id='paymentTerms' name='terms' className="form-check-input"  onChange={e => this.handleChange(e)} value={this.state.acceptedTerms} />
                </div>
                <button type="submit" className='btn btn-primary' disabled={!this.state.isFormValid} > Bekräfta köp</button>
            </form>
        );
    }
}

export default Payment;