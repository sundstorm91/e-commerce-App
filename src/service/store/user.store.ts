import { api } from '@/utils/api-utils';
import { create } from 'zustand';
import { UserService } from '../api/users';
import { useCartStore } from './cart.store';

export interface ILoginCredentials {
    username: string;
    password: string;
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    password?: string;
}

interface IAuthResponse {
  token: string; // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

interface IUserState {
    currentUser: IUser | null;
    isLoading: boolean;
    error: string | null;
    token?: string | null;
    isAuth: boolean;


    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => void;
    register: (username: string,  password: string, email?: string) => void;
    checkAuth: () => void;
}

export const useUserStore = create<IUserState>((set) => ({
    currentUser: null,
    isLoading: false,
    error: null,
    token: null,
    isAuth: false,

    login: async({ username, password }: ILoginCredentials) => {
        set({ isLoading: true, error: null})

        try {
            const authResponse = await api.post<IAuthResponse>('/auth/login', { username, password })

            const { token } = authResponse.data

            const user = (await UserService.getAllUsers()).find(u => u.username === username)

            if (!user) {
                throw new Error ('user not found');
            }

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user))

            set({
                currentUser: user,
                token: token,
                isAuth: true,
                error: null,
            })

          useCartStore.getState().loadCart();
        } catch(err: unknown) {
            const errMessage = err instanceof Error ? err.message : 'Login Failed';
            set({
                error: errMessage,
                currentUser: null,
                isAuth: false,
                token: null,
            })
        } finally {
            set({ isLoading: false })
        }
    },

    logout: () => {

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        set({
            currentUser: null,
            error: null,
            token: null,
            isAuth: false,
        })
    },

    checkAuth: () => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
            set({
                currentUser: JSON.parse(user),
                isAuth: true,
                token: token,
            })
        }
    },

    register(username, password, email) {
        const mockUser = {
            id: Math.random(),
            username: username,
            email: email!,
            token: 'fake-token-jwt',
            password: password,
        }

        set({
            currentUser: mockUser, isAuth: true
        })

        localStorage.setItem('user', JSON.stringify(mockUser))

    },


}))