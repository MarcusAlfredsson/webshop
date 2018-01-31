import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Products from './containers/Products';
import OrderBag from './containers/OrderBag';
import Payment from './containers/Payment';
import Confirmation from './containers/Confirmation';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }

  ComponentDidCatch(error, errorInfo) {
    this.setState({error: errorInfo});
  }

  render() {
    if (this.state.error) {
      return 'Något gick fel';
    }

    return (
      <div className='App'>
        <header className='App-header'>
        <div className='col-md-1' >
          <a href='/' >
            <span className='glyphicon glyphicon-home link' />
          </a>
        </div>
        <div className='col-md-10'>
          <h1>Webshop</h1>
        </div>
        <div className='col-md-1'>
          <a href='/orderbag' className='glyphicon glyphicon-shopping-cart link'>
            <span id='orderBagTotal' />
          </a>
        </div>
        </header>
        <div className='container'>
          <Router>
            <div>
              <Route exact path='/' component={Products}/>
              <Route path='/orderbag' component={OrderBag}/>
              <Route path='/payment' component={Payment}/>
              <Route path='/confirmation' component={Confirmation}/>
            </div>
          </Router>
          {/* <Products addProduct={(product) => this.addProduct(product)}/> */}
        </div>
      </div>
    );
  }
}

export default App;
