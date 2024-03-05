import { makeObservable, observable, action } from 'mobx';
import { PRODUCT_URL } from '../constants';
import { Product } from '../types';

class ProductsStore {
  products: Array<Product> = [];
  limit: number = 10;
  skip: number = 0;

  constructor() {
    makeObservable(this, {
        products: observable,
        skip: observable,
        addProducts: action,
        incrementSkip: action,
    });
  }

  incrementSkip = () => {
    this.skip += this.limit;
  }

  addProducts = (products: Array<Product>) => {
    this.products = [...this.products, ...products];
  }
  
  fetchProducts = async () => {
    const url = new URL(PRODUCT_URL);
    url.searchParams.set('limit', this.limit.toString());
    url.searchParams.set('skip', this.skip.toString());

    const res = await fetch(url);
    const jsonResponse = await res.json();
    this.addProducts(jsonResponse?.products);
  };
}

export default new ProductsStore();