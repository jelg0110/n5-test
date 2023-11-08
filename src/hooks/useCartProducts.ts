import { useState } from "react";
import { Product, CartProduct } from "../types/Product";
import { getLocalStorage, setLocalStorage } from "../services/utils";

export const useProducts = () => {
  const [cartProducts, setLocalCartProducts] = useState<CartProduct[]>(getLocalStorage('cartProducts') || []);
  const setCartProducts = (data: CartProduct[]) => {
    setLocalStorage('cartProducts', data);
    setLocalCartProducts(data);
  };

  const getProduct = (product: Product): Product | CartProduct => {
    const cartProduct = cartProducts.find(item => item.id === product.id);
    if (cartProduct) {
      return cartProduct;
    }
    return product;
  }

  const handleAmountChange = (prod: Product) => (value: number) => {
    if (value === 0) {
      const products = cartProducts.filter(item => item.id !== prod.id)
      setCartProducts(products);
      return;
    }

    // If product is alredy in cart, update it
    if (cartProducts.find(item => item.id === prod.id)) {
      const products = cartProducts.map((item: CartProduct) => {
        if (item.id === prod.id) {
          return {
            ...item,
            requestedAmount: value,
          };
        }
        return item
      });
      setCartProducts(products);
      // If not, add it
    } else {
      const products = cartProducts.concat({
        ...prod,
        requestedAmount: value,
      })
      setCartProducts(products);
    }
  }

  return {
    cartProducts,
    setCartProducts,
    getProduct,
    handleAmountChange,
  };
}

export default useProducts;