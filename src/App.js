import React, { Component } from 'react';
import './App.css';
import Products from './containers/Products';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import OrderBag from './containers/OrderBag';

class App extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      orderCount: 0,
      error: null,
    };
  }

  ComponentDidCatch(error, errorInfo) {
    this.setState({error: errorInfo});
  }

  addProduct(product) {
    console.log("Product with id: " + product + "was added to order");
    var isOrderAdded = this.state.order.find((item) => item.id === product.id);
    if (isOrderAdded === undefined) {
      this.setState({
        order: [...this.state.order, product],
        orderCount: this.state.order.length + 1
      });
    }
  }


  render() {
    if (this.state.error) {
      return "Något gick fel";
    }

    return (
      <div className="App">
        <header className="App-header">
        <div className="col-md-1" >
          <a href="/" className="glyphicon glyphicon-home link" />
        </div>
        <div className="col-md-10">
          <h1>Webshop</h1>
        </div>
        <div className="col-md-1">
          <a href="/OrderBag" className="glyphicon glyphicon-shopping-cart link">{this.state.orderCount}</a>
        </div>
        </header>
        <div className="container">
          <Router>
            <div>
              <Route exact path="/" component={Products}/>
              <Route path="/OrderBag" component={OrderBag}/>
              {/* <Route path="/payment" component={payment}/>
              <Route path="/confirmation" component={confirmation}/> */}
            </div>
          </Router>
          {/* <Products addProduct={(product) => this.addProduct(product)}/> */}
        </div>
      </div>
    );
  }
}

export default App;
