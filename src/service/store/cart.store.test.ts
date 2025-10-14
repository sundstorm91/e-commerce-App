import { CartService } from "@/api/cart";
import { ProductsService } from "../api/products";
import { vi, describe, beforeEach, test, expect, type Mock } from "vitest";
import { useCartStore } from "./cart.store";
import { useUserStore } from "./user.store";
import type { IProduct } from "@/types/data-types";

// Мокаем ВСЕ внешние зависимости
vi.mock('./user.store.ts');
vi.mock('../../api/cart.ts');
vi.mock('../api/products.ts');

const mockedUseUserStore = vi.mocked(useUserStore);
const mockedCartService = vi.mocked(CartService);
const mockedProductsService = vi.mocked(ProductsService);


describe('loadCart', () => {
  beforeEach(() => {
    // Сбрасываем стейт.. Будет срабатывать при каждом новом тесте!
    useCartStore.setState({
      items: [],
      isLoading: false,
      userId: null,
      isOpen: false,
      error: null
    });

    // Сбрасываем все моки
    vi.clearAllMocks();
  });

  test('should clear cart when no user id', async () => {
    // при вызове getState - будет возвращаться null
    (mockedUseUserStore.getState as Mock).mockReturnValue({
      currentUser: null,
    });

    // Вызов loadCart - записываем в state null
    await useCartStore.getState().loadCart();

    // Смотрим стейт, предварительно записываем значения в переменную state
    const state = useCartStore.getState();
    // Проверяем значения state.items c toEqual; state.isLoading c false
    expect(state.items).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  test('debug imports productService', () => {
  console.log('🟢 getById exists:', 'getById' in ProductsService);
  console.log('🟢 getById type:', typeof ProductsService.getById);
  console.log('🟢 Is mock function?', vi.isMockFunction(ProductsService.getById));

  });

  test('debug imports cartService', () => {
  console.log('🟢 getByUserId exists:', 'getByUserId' in CartService);
  console.log('🟢 getByUserId type:', typeof CartService.getByUserId);
  console.log('🟢 Is mock function?', vi.isMockFunction(CartService.getByUserId));
  });

  test('addItem adds new product', () => {

     // Мокаем userStore чтобы пользователь был авторизован
  (useUserStore.getState as Mock).mockReturnValue({
    isAuth: true, // ← важно!
    currentUser: { id: 1 }
  });

  const mockProduct: IProduct = {
    id: 1,
    title: 'title-product',
    price: 100,
    category: 'test-category',
    description: 'test-description',
    image: 'test-image',
  }

  useCartStore.getState().addItem(mockProduct);
  expect(useCartStore.getState().items).toHaveLength(1);
});

test('removeItem removes product by id', () => {
  // Arrange - начальное состояние с товарами
  useCartStore.setState({
    items: [
      { id: 1, title: 'Product 1', price: 100, image: 'img1.jpg', quantity: 1 },
      { id: 2, title: 'Product 2', price: 200, image: 'img2.jpg', quantity: 1 }
    ]
  });

  // Act - удаляем товар с id=1
  useCartStore.getState().removeItem(1);

  // Assert - остался только товар с id=2
  const state = useCartStore.getState();
  expect(state.items).toHaveLength(1);
  expect(state.items[0].id).toBe(2);
});

test('total calculates sum correctly', () => {
  // Arrange - товары с разными ценами и quantity
  useCartStore.setState({
    items: [
      { id: 1, price: 100, quantity: 2, image: 'test-image.jpg', title: 'test-title' },
      { id: 2, price: 200, quantity: 1, image: 'test-image.jpg', title: 'test-title' },
      { id: 3, price: 50, quantity: 3, image: 'test-image.jpg', title: 'test-title' }
    ]
  });

  // Act & Assert
  expect(useCartStore.getState().total()).toBe(550); // 200 + 200 + 150
});

test('total returns 0 for empty cart', () => {
  // Arrange - пустая корзина
  useCartStore.setState({ items: [] });

  // Act & Assert
  expect(useCartStore.getState().total()).toBe(0);
});

})



