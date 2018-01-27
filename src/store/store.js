import { createStore } from 'redux';
import OrderReducer from '../reducers/OrderReducer';

let store = createStore(OrderReducer);