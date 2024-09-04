import ProductController from "./controllers/product.controller";

const init = () => {
  const productController = new ProductController();
  return {
    productController
  }
}

init();
