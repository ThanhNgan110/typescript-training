import Cart from "./cart";

interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
  imgURL: string;
}

interface Product extends Cart {
  cartId: string;
}

export default Product;
