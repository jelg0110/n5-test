export interface Product {
  name: string;
  price: number;
  amount: number;
  id: number;
}

export interface CartProduct extends Product {
  requestedAmount: number;
}