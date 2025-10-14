import { describe, test, expect } from 'vitest';
import { tranformIntoCartItem } from './helpers';
import type { IProduct } from '@/types/data-types';

describe('tranformIntoCartItem', () => {
  test('should transform product to cart item with default quantity', () => {

    const mockProduct: IProduct = {
      id: 1,
      image: 'test-image.jpg',
      title: 'Test Product',
      price: 99.99,
      category: 'test-category',
      description: 'test-description'
    };

    const result = tranformIntoCartItem(mockProduct);

    expect(result).toEqual({
      id: 1,
      image: 'test-image.jpg',
      title: 'Test Product',
      price: 99.99,
      quantity: 1
    });
  });

  test('should transform product to cart item with custom quantity', () => {
    const mockProduct: IProduct = {
      id: 2,
      image: 'product2.jpg',
      title: 'Another Product',
      price: 149.99,
      category: 'test-category2',
      description: 'test-description2'
    };

    const result = tranformIntoCartItem(mockProduct, 3);
    expect(result.quantity).toBe(3);
  });
});