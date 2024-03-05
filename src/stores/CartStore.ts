import { makeObservable, observable, action, toJS } from 'mobx';
// import { toJS } from 'mobx-react';
import { CartItems } from '../types';

class CartStore {
  // object of carts storing product id as key and quantity as value
  cartItems: CartItems = {};

  constructor() {
    makeObservable(this, {
        cartItems: observable,
        addItemToCart: action,
        deleteItemFromCart: action
    });
  }

  addItemToCart = (id: number) => {
    this.cartItems[id] = this.cartItems[id] && this.cartItems[id] >= 0 ? this.cartItems[id] + 1 : 1;
    console.log(toJS(this.cartItems));
  }

  deleteItemFromCart = (id: number) => {
    this.cartItems[id] = this.cartItems[id] && this.cartItems[id] >= 0 ? this.cartItems[id] - 1 : 0;
    console.log(toJS(this.cartItems));
  }
}

export default new CartStore();