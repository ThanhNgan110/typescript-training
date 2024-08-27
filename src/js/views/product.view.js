import { getElementById, querySelector } from "../helpers/selector";
import { displayProduct, cartNumberBadge } from "../templates/product.template";
export default class ProductView {
  constructor() {
    this.cardBlock = querySelector(".card-block");
    this.searchForm = getElementById("search-form");
    this.inputSearch = getElementById("input-search");
    this.messageContent = querySelector(".message-empty");
    this.blockCart = querySelector(".block-cart");
  }

  renderProductGrid = (products) => {
    this.cardBlock.innerHTML = displayProduct(products);
  };

  displayTotalProductAndPrice = (products) => {
    this.blockCart.innerHTML = cartNumberBadge(products)
  };

  bindSearchProducts = (handler) => {
    this.searchForm.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this.inputSearch.value);
    });
  };

  displayMessage = (message) => {
    this.messageContent.innerHTML = message;
  };

  bindAddProducts = (handler) => {
    const btnCards = document.querySelectorAll(".btn-card");
    btnCards.forEach((btnCard) => {
      btnCard.addEventListener("click", () => {
        let productId = btnCard.dataset.id;
        handler(productId);
      });
    });
  };
}
