import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Products from '../components/Products';
import ProductsStore from '../stores/ProductsStore';
import CartStore from '../stores/CartStore';

jest.mock('../customHooks/useThrottle', () => jest.fn((callback) => callback));

// Mocking ProductsStore fetchProducts function
jest.mock('../stores/ProductsStore', () => ({
  fetchProducts: jest.fn(),
  incrementSkip: jest.fn(),
  skip: 0,
  products: [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      thumbnail: 'image1.jpg',
      price: 50,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      thumbnail: 'image2.jpg',
      price: 75,
    },
  ],
}));

// Mocking CartStore cartItems
jest.mock('../stores/CartStore', () => ({
  cartItems: {},
  addItemToCart: jest.fn(),
}));

describe('Products Component', () => {
  it('renders products correctly', async () => {
    render(      <BrowserRouter>
      <Products />
    </BrowserRouter>);

    // Wait for the products to be loaded
    await screen.findByTestId('products-page');

    // Check if products are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('calls addItemToCart when "Add to Cart" button is clicked', async () => {
    render(
      <BrowserRouter>
      <Products />
    </BrowserRouter>
    );

    // Wait for the products to be loaded
    await screen.findByTestId('products-page');

    // Mock the CartStore to have 0 quantity for the first product
    CartStore.cartItems = { 1: 0 };

    // Find the "Add to Cart" button for the first product and click it
    const addToCartButton = screen.getAllByText('Add to Cart');

    act(() => {
      addToCartButton[0].click();
    });

    // Check if addItemToCart is called with the correct productId
    expect(CartStore.addItemToCart).toHaveBeenCalledWith(1);
  });

  // Add more tests as needed
});
