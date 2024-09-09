export interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
  imgURL: string;
}

export interface Cart extends Product {
  cartId?: string;
}
