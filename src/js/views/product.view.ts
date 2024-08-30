import { getElementById, querySelector } from "../helpers/selector";
import { displayProduct, cartNumberBadge } from "../templates/product.template";
import Product from "../type/product";

export default class ProductView {
  private cardBlock: Element | null;
  private searchForm: Element | null;
  private inputSearch: Element | null;
  private messageContent: Element | null;
  private blockCart: Element | null;

  constructor() {
    this.cardBlock = querySelector(".card-block");
    this.searchForm = getElementById("search-form");
    this.inputSearch = getElementById("input-search");
    this.messageContent = querySelector(".message-empty");
    this.blockCart = querySelector(".block-cart");
  }

  renderProductGrid = (products: Product[]): { error?: string } | void => {
    if (!this.cardBlock) {
      return { error: "Element cardBlock not found" };
    }
    this.cardBlock.innerHTML = displayProduct(products);
  };

  displayTotalProductAndPrice = (
    products: object
  ): { error?: string } | void => {
    if (!this.blockCart) {
      return { error: "Element blockCart not found" };
    }
    this.blockCart.innerHTML = cartNumberBadge(products);
  };

  bindSearchProducts = (
    handler: (value: string) => void
  ): { error?: string } | void => {
    if (!this.searchForm) {
      return { error: "Element searchForm not found" };
    }
    this.searchForm.addEventListener("click", (e) => {
      e.preventDefault();
      handler((this.inputSearch as HTMLInputElement)?.value);
    });
  };

  displayMessage = (message: string): { error?: string } | void => {
    if (!this.messageContent) {
      return { error: "Element not found" };
    }
    this.messageContent.innerHTML = message;
  };

  bindAddProducts = (
    handler: (productId: string) => void
  ): { error?: string } | void => {
    const btnCards = document.querySelectorAll(".btn-card");
    btnCards.forEach((btnCard) => {
      btnCard.addEventListener("click", () => {
        let productId = (btnCard as HTMLElement).dataset.id;
        if (!productId) {
          return { error: "Product id not found" };
        }
        handler(productId);
      });
    });
  };
}
