import { makeObservable, observable, action } from 'mobx';

class CartStore {
  products = [];

  constructor() {
    makeObservable(this, {
        products: observable,
        fetchProducts: action
    });
  }

  fetchProducts = () => {
    // this.cart.push(todo);
  };
}

export default new CartStore();