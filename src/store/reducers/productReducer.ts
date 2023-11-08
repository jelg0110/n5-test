import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { RootState } from '..';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    reset: state => initialState,
  },
})

export const { setProducts, reset } = productSlice.actions;

export const stateProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;