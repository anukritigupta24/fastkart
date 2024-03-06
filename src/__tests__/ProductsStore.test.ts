import { when } from 'mobx';
import ProductsStore from '../stores/ProductsStore';

describe('ProductsStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock fetch function
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ products: [{ id: 1, title: 'Test Product' }] })
    })
  });

  test('should fetch products and update state', async () => {
    // Mock the URLSearchParams
    global.URLSearchParams = jest.fn(() => ({
      set: jest.fn(),
    }));

    // Set up an observable reaction to wait for the state to update
    let stateUpdated = false;
    when(() => ProductsStore.products.length > 0, () => (stateUpdated = true));

    // Call the fetchProducts method
    await ProductsStore.fetchProducts();

    // Assertions
    expect(global.URLSearchParams).toHaveBeenCalledWith('limit', '10');
    expect(global.URLSearchParams).toHaveBeenCalledWith('skip', '0');
    expect(fetch).toHaveBeenCalledWith(expect.any(String));

    // Wait for the state to be updated (observe the reaction)
    await Promise.resolve(); // Run microtasks
    expect(stateUpdated).toBe(true);
  });

  test('should increment skip value', () => {
    ProductsStore.incrementSkip();
    expect(ProductsStore.skip).toBe(10);
  });
});