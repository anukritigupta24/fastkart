import { makeObservable, observable, action, computed } from 'mobx';
import { CartItems } from '../types';
import ProductsStore from './ProductsStore';

class CartStore {
  // object of carts storing product id as key and quantity as value
  cartItems: CartItems = {};

  constructor() {
    makeObservable(this, {
        cartItems: observable,
        addItemToCart: action,
        deleteItemFromCart: action,
        totalCartValue: computed
    });

    this.cartItems = JSON.parse(localStorage.getItem("cartItems") || '{}');
  }

  addItemToCart = (id: number) => {
    this.cartItems[id] = this.cartItems[id] && this.cartItems[id] >= 0 ? this.cartItems[id] + 1 : 1;
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  deleteItemFromCart = (id: number) => {
    this.cartItems[id] = this.cartItems[id] && this.cartItems[id] >= 0 ? this.cartItems[id] - 1 : 0;
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  get totalCartValue() {
    let total = 0;
    for(const [productId, quantity] of Object.entries(this.cartItems)) {
      const product = ProductsStore.products.find((product) => product.id === Number(productId));

      total += Number(product?.price)*Number(quantity);
    }

    return total;
  }
}

export default new CartStore();