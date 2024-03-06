import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Products from '../components/Products';
import ProductsStore from '../stores/ProductsStore';
import CartStore from '../stores/CartStore';
import useThrottleFunction from '../customHooks/useThrottle';

// Mock the MobX stores and the custom hook
jest.mock('../stores/ProductsStore', () => ({
  fetchProducts: jest.fn(),
  incrementSkip: jest.fn(),
  products: [],
  skip: 0
}));

jest.mock('../stores/CartStore', () => ({
  addItemToCart: jest.fn(),
  cartItems: {}
}));

jest.mock('../customHooks/useThrottle', () => jest.fn(fn => fn));

describe('Products Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    ProductsStore.products = [
      { id: '1', title: 'Test Product 1', description: 'Test Description 1', thumbnail: 'test-thumbnail-1.jpg', price: 100 },
      // Add more mock products as needed
    ];
    ProductsStore.fetchProducts.mockImplementation(() => {});
    CartStore.addItemToCart.mockImplementation(() => {});
  });

  test('renders products and allows adding to cart', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(CartStore.addItemToCart).toHaveBeenCalledWith('1');
  });

  test('navigates to cart view', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('View Cart'));
    expect(window.location.pathname).toBe('/cart');
  });
});
