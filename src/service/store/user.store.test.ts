import { api } from "@/utils/api-utils";
import { describe, expect, test, vi } from "vitest";
import { UserService } from "../api/users";
import { useCartStore } from "./cart.store";
import  { useUserStore } from "./user.store";

describe('useUserStore', () => {

    test('login success flow', async () => {

  // 1. Мокаем все зависимости
  const mockApiPost = vi.fn();
  const mockUserServiceGetAll = vi.fn();
  const mockLoadCart = vi.fn();

  // Заменяем реальные функции на моки
  api.post = mockApiPost;
  UserService.getAllUsers = mockUserServiceGetAll;
  useCartStore.getState().loadCart = mockLoadCart;

  // 2. Мокаем localStorage
  const localStorageMock = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  };

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // 3. Мокаем ответы API
  const mockToken = 'test-jwt-token';
  const mockUser = {
    id: 1,
    username: 'testUser',
    email: 'test@example.com'
  };

  mockApiPost.mockResolvedValue({
    data: { token: mockToken }
  });

  mockUserServiceGetAll.mockResolvedValue([mockUser]);

  // 4. Вызываем login
  await useUserStore.getState().login({
    username: 'testUser',
    password: 'password123'
  });

  // 5. Проверяем результаты
  const state = useUserStore.getState();

  // Проверяем состояние store
  expect(state.isAuth).toBe(true);
  expect(state.currentUser).toEqual(mockUser);
  expect(state.token).toBe(mockToken);
  expect(state.error).toBeNull();
  expect(state.isLoading).toBe(false);

  // Проверяем вызовы API
  expect(mockApiPost).toHaveBeenCalledWith('/auth/login', {
    username: 'testUser',
    password: 'password123'
  });
  expect(mockUserServiceGetAll).toHaveBeenCalled();

  // Проверяем localStorage
  expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', mockToken);
  expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));

  // Проверяем что корзина загрузилась
  expect(mockLoadCart).toHaveBeenCalled();
});

   test('logout clears user data and auth status', () => {
  // 1. Мокаем localStorage
  const localStorageMock = {
    removeItem: vi.fn(),
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // 2. Устанавливаем начальное состояние (авторизованный пользователь)
  useUserStore.setState({
    currentUser: { id: 1, username: 'testUser', email: 'testUser@mail.ru' },
    token: 'test-token',
    isAuth: true,
    error: 'some error',
    isLoading: false
  });

  // 3. Вызываем logout
  useUserStore.getState().logout();

  // 4. Проверяем что состояние сбросилось
  const state = useUserStore.getState();
  expect(state.currentUser).toBeNull();
  expect(state.token).toBeNull();
  expect(state.isAuth).toBe(false);
  expect(state.error).toBeNull();

  // 5. Проверяем что очистился localStorage
  expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
  expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
});


    test('checkAuth restores user from localStorage when data exists', () => {

    const mockUser = { id: 1, username: 'testUser' };
    const mockToken = 'test-token-123';

    const localStorageMock = {
    getItem: vi.fn(),
  };

  localStorageMock.getItem.mockImplementation((key) => {
    if (key === 'user') return JSON.stringify(mockUser);
    if (key === 'token') return mockToken;
  });

  Object.defineProperty(window, 'localStorage', { value: localStorageMock })

    useUserStore.getState().checkAuth();
    const state = useUserStore.getState();
    expect(state.currentUser).toEqual(mockUser);
    expect(state.isAuth).toBe(true);
    expect(state.token).toBe(mockToken);

});

test('checkAuth does nothing when no data in localStorage', () => {
  const localStorageMock = {
    getItem: vi.fn(),
  };

  localStorageMock.getItem.mockImplementation((key) => {
    if (key === 'user') return null;
    if (key === 'token') return null;
  });

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  const initialState = { ...useUserStore.getState() };

  useUserStore.getState().checkAuth?.();

  const state = useUserStore.getState();

  expect(state.currentUser).toEqual(initialState.currentUser);
  expect(state.isAuth).toEqual(initialState.isAuth);
  expect(state.token).toEqual(initialState.token);
});
})