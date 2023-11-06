export const BASE = {
  baseUrl: process.env.REACT_APP_API || '',
  endpoints: {
    products: () => `products/`,
  },
};