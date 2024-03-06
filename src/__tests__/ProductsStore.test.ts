import { act } from '@testing-library/react';
import { PRODUCT_URL } from '../constants';
import ProductsStore from '../stores/ProductsStore'

// Mock the fetch function
global.fetch = jest.fn();

describe('ProductsStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    ProductsStore.products = [];
    ProductsStore.skip = 0;
  });

  afterEach(() => {
    // Clear mock data after each test
    jest.clearAllMocks();
  });

  it('should increment skip correctly', () => {
    act(() => {
      ProductsStore.incrementSkip();
    });
    expect(ProductsStore.skip).toBe(ProductsStore.limit);
  });

  it('should add products correctly', () => {
    const newProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    act(() => {
      ProductsStore.addProducts(newProducts);
    });

    expect(ProductsStore.products).toEqual(newProducts);
  });

  it('should fetch products correctly', async () => {
    const mockResponse = {
      products: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }],
    };

    // Mock the fetch function to return a promise with the mock response
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    await act(async () => {
      await ProductsStore.fetchProducts();
    });

    expect(ProductsStore.products).toEqual(mockResponse.products);

    const calledURL = fetch.mock.calls.pop()[0].toString();

    // Check if the fetch function was called with the correct URL
    expect(calledURL).toEqual(expect.stringContaining(PRODUCT_URL));
    expect(calledURL).toEqual(expect.stringContaining(`limit=${ProductsStore.limit}`));
    expect(calledURL).toEqual(expect.stringContaining(`skip=${ProductsStore.skip}`));
  });
});
