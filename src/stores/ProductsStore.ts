import { makeObservable, observable, action } from 'mobx';

class ProductsStore {
  products = [];

  constructor() {
    makeObservable(this, {
        products: observable,
        fetchProducts: action
    });
  }

  fetchProducts = () => {
    // this.products.push(todo);
  };
}

export default new ProductsStore();