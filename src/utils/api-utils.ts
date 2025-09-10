import axios from 'axios';

export const fakeApiStoreConfig = {
    baseURL: 'https://fakestoreapi.com/',
    productURL: 'https://fakestoreapi.com/products/',
    cartURL: 'https://fakestoreapi.com/carts/',
    usersURL: 'https://fakestoreapi.com/users/',
}

export const api = axios.create({
    baseURL: fakeApiStoreConfig.baseURL,
    timeout: 10000,
})

api.interceptors.response.use(
    (response) => response,

    (err) => {
        console.error(err)
        return Promise.reject(err)
    }
)
