import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../components/Cart';

// Mock the MobX stores
jest.mock('../stores/CartStore', () => ({
  cartItems: { '1': 2, '2': 1 }, // Mocked cart items
  totalCartValue: 300, // Mocked total cart value
}));

jest.mock('../stores/ProductsStore', () => ({
  products: [
    { id: 1, title: 'Product 1', thumbnail: 'thumbnail1.jpg', price: 100 },
    { id: 2, title: 'Product 2', thumbnail: 'thumbnail2.jpg', price: 100 },
  ],
}));

describe('Cart Component', () => {
  test('renders cart items and total value', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    // Check if cart items are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();

    // Check if total cart value is rendered
    expect(screen.getByText('Total cart value: ₹300')).toBeInTheDocument();
  });
});