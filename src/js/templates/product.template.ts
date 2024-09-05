import { Product } from "../type/product";

export const displayProduct = (products: Product[]) => {
  let contentProduct = "";
  if (products) {
    products.forEach((item) => {
      contentProduct += productTemplate(item);
    });
  } else {
    contentProduct = "";
  }
  return contentProduct;
};

export const productTemplate = (product: Product) => {
  const { id, imgURL, name, price } = product;
  return `
  <article class="card-product">
  <img class="card-img" src="${imgURL}">
  <div class="card-body">
      <div class="card-content">
          <h3 class="product-name">${name}</h3>
          <p class="product-price">$${price}</p>
      </div>
      <button data-id=${id} class="btn-card"> 
        <span class="border-circle"><span class="icon icon-bag"></span></span>
      </button>
  </div>
  </article>
  `;
};

export const cartNumberBadge = ({ product = [], total = 0 }) => {
  return `
    <span class="icon icon-medium icon-cart"></span>
    <span class="icon icon-circle">${product.length}</span>
    <div class="block-total-cart">
      <p class="name-cart">Shopping cart</p>
      <p class="total-price">$${total}</p>
    </div>`;
};
