import {
  querySelector,
  querySelectorAll,
  getElementById,
} from "../helpers/selector";
import { displayCart, cartSum } from "../templates/cart.template";
import { showSuccess } from "../utils/toastify";
import { ALERT_MESSAGE } from "../constants/message";

export default class CartView {
  constructor() {
    this.wrapperCart = querySelector(".wrapper-cart");
    this.btnOpenModal = getElementById("btn-open-modal");
    this.modalCart = getElementById("modal-cart");
    this.modalCheckout = getElementById("modal-checkout");
  }

  renderCart = ({ products, handleUpdateCart, handleRenderCheckout }) => {
    cartSum(products);
    this.wrapperCart.innerHTML = displayCart(products);
    this.bindControlsEvents(handleUpdateCart, handleRenderCheckout);
  };

  bindControlsEvents = (handleUpdateCart, handleRenderCheckout) => {
    this.bindChangeActions();
    this.bindUpdateCart(handleUpdateCart);
    this.bindCloseModalCart();
    this.bindCheckoutCart(handleRenderCheckout);
  };

  bindShowModal = (handler) => {
    this.btnOpenModal.addEventListener("click", () => {
      this.modalCart.style.display = "block";
      handler();
    });
  };

  bindChangeActions = () => {
    const cartTableBody = getElementById("cart-table-body");
    cartTableBody.addEventListener("click", (e) => {
      const dataType =
        e.target.getAttribute("data-type") ||
        e.target.parentNode.getAttribute("data-type");
      const dataId =
        e.target.getAttribute("data-id") ||
        e.target.parentNode.getAttribute("data-id");

      switch (dataType) {
        case "minus":
          this.handleChangeQuantity(cartTableBody, "minus", dataId);
          break;

        case "plus":
          this.handleChangeQuantity(cartTableBody, "plus", dataId);
          break;

        case "remove":
          this.bindHiddenProduct(dataId);
          break;

        default:
          break;
      }
    });
  };

  handleChangeQuantity = (cartTableBody, type, dataId) => {
    const inputQuantity = cartTableBody.querySelector(
      `input[data-id="${dataId}"]`
    );
    switch (type) {
      case "plus":
        inputQuantity.value && inputQuantity.value++;
        break;

      case "minus":
        inputQuantity.value <= 1
          ? (inputQuantity.value = 1)
          : inputQuantity.value--;
        break;
    }
  };

  bindHiddenProduct = (productId) => {
    const productRows = querySelectorAll(".col-tbody");
    productRows.forEach((productRow) => {
      if (productRow.getAttribute("data-id") === productId) {
        productRow.classList.add("marked-deleted");
        productRow.setAttribute("marked-deleted", "true");
        showSuccess({ text: ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS_MSG });
      }
    });
  };

  bindUpdateCart = (handler) => {
    const btnUpdate = getElementById("btn-update-cart");
    if (btnUpdate) {
      btnUpdate.addEventListener("click", () => {
        const productRows = document.querySelectorAll(
          ".col-tbody[marked-deleted=true]"
        );
        const deletedIds = Array.from(productRows).map((productRow) =>
          productRow.getAttribute("data-id")
        );

        const inputQuantity = querySelectorAll(
          ".col-tbody:not([marked-deleted=true]) .input-quantity"
        );
        const updateItems = [];
        inputQuantity.forEach((input) =>
          updateItems.push({
            id: input.dataset.id,
            quantity: parseInt(input.value),
          })
        );
        handler(updateItems, deletedIds);
      });
    }
  };

  bindCloseModal = (btnReturn, modal) => {
    const closeModal = getElementById(btnReturn);
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  };

  bindCloseModalCheckout = () => {
    this.bindCloseModal("btn-close-checkout", this.modalCheckout);
  };

  bindCloseModalCart = () => {
    this.bindCloseModal("btn-close-cart", this.modalCart);
  };

  bindCheckoutCart = (handler) => {
    const btnCheckout = getElementById("btn-checkout");
    btnCheckout.addEventListener("click", () => {
      this.modalCart.style.display = "none";
      this.modalCheckout.style.display = "block";
      handler();
    });
  };
}
