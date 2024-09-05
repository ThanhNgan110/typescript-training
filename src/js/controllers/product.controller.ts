import { ALERT_MESSAGE } from "../constants/message";

import { showSuccess, showError } from "../utils/toastify";

import { displayLoading, hideLoading } from "../utils/loading";

import ProductModel from "../models/product.model";
import CartModel from "../models/cart.model";
import StateModel from "../models/state.model";
import OrderModel from "../models/order.model";

import ProductView from "../views/product.view";
import CartView from "../views/cart.view";
import CheckoutView from "../views/checkout.view";

import ProductService from "../services/product.service";
import CartItemService from "../services/cartItem.service";
import CountryService from "../services/country.service";
import StateService from "../services/state.service";

import { Cart } from "../type/product";
import Order from "../type/order";

export default class ProductController {
  private productModel: ProductModel;
  private cartModel: CartModel;
  private stateModel: StateModel;
  private orderModel: OrderModel;
  private productView: ProductView;
  private cartView: CartView;
  private checkoutView: CheckoutView;
  private productService: ProductService;
  private cartItemService: CartItemService;
  private countryService: CountryService;
  private stateService: StateService;

  constructor() {
    this.productModel = new ProductModel();
    this.cartModel = new CartModel();
    this.stateModel = new StateModel();
    this.orderModel = new OrderModel();
    this.productView = new ProductView();
    this.cartView = new CartView();
    this.checkoutView = new CheckoutView();
    this.productService = new ProductService();
    this.cartItemService = new CartItemService();
    this.countryService = new CountryService();
    this.stateService = new StateService();

    this.init();
  }

  init = () => {
    this.productView.bindSearchProducts(this.handleSearchProducts);
    this.handleRenderProductsGrid();
    this.handleRenderCart();
    this.cartView.bindShowModal(this.handleRenderCart);
  };

  handleRenderCart = async () => {
    const products: Cart[] =
      await this.cartItemService.getAllProductsFromCart();

    this.cartModel.setCart(products);

    this.cartView.renderCart({
      products: this.cartModel.getCart(),
      handleUpdateCart: this.handleUpdateCart,
      handleRenderCheckout: this.handleRenderCheckout,
    });
    this.productView.displayTotalProductAndPrice(
      this.cartModel.totalProductAndPrice(products)
    );
  };

  handleRenderProductsGrid = async () => {
    displayLoading();
    const res = await this.productService.getAllProducts();
    this.productModel.setProducts(res);
    this.productView.renderProductGrid(this.productModel.getProducts());
    this.productView.bindAddProducts(this.handleAddProduct);
    hideLoading();
  };

  handleSearchProducts = async (productName: string) => {
    const products = await this.productService.getAllProducts();
    this.productModel.setProducts(products);
    const result = this.productModel.searchProductByName(productName);
    if (!result) {
      this.productView.displayMessage(
        ALERT_MESSAGE.SEARCH_PRODUCT_LIST_EMPTY_HEADING
      );
    }
    this.productView.renderProductGrid(result || []);
    this.productView.bindAddProducts(this.handleAddProduct);
  };

  handleAddProduct = async (productId: string) => {
    try {
      displayLoading();
      const products = this.cartModel.getCart();
      this.cartModel.setCart(products);
      let existingProduct = this.cartModel.checkProductIdExisting(productId);
      const listProduct = this.productModel.getProducts();
      this.productModel.setProducts(listProduct);
      const product = this.productModel.getProductById(productId);

      if (!!existingProduct) {
        await this.cartItemService.updateCart({
          ...existingProduct,
          amount: existingProduct.amount + 1,
        });
      } else {
        product && (await this.cartItemService.addProductToCart(product));
      }

      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.ADD_PRODUCT_SUCCESS_MSG });
      await this.handleRenderCart();
    } catch (error) {
      showError({ text: ALERT_MESSAGE.ADD_PRODUCT_FAILED_MSG });
    }
  };

  handleDeleteCartItem = async (deletedIds: string[]) => {
    const promises = deletedIds.map((deleteId) =>
      this.cartItemService.deleteProductFromCart(deleteId)
    );

    return promises;
  };

  handleUpdateCartItem = async (
    updateItems: { id: string; quantity: number }[]
  ) => {
    const promises = updateItems.map((item) =>
      this.cartItemService.updateCart({ id: item.id, amount: item.quantity })
    );

    return promises;
  };

  handleUpdateCart = async (
    quantities: { id: string; quantity: number }[],
    deletedIds: string[]
  ) => {
    try {
      displayLoading();
      await Promise.all([
        this.handleDeleteCartItem(deletedIds),
        this.handleUpdateCartItem(quantities),
      ]);
      hideLoading();
      showSuccess({ text: ALERT_MESSAGE.UPDATE_CART_SUCCESS_MSG });
      await this.handleRenderCart();
    } catch (error) {
      showError({ text: ALERT_MESSAGE.UPDATE_CART_FAILED_MSG });
    }
  };

  handleGetStates = async (countryId: string) => {
    const states = await this.stateService.getState();
    this.stateModel.setState(states);
    const listState = this.stateModel.getStateByCountry(countryId);
    if (!listState) {
      return { error: "Not found country id" };
    }
    this.checkoutView.handleRenderStates(listState);
  };

  handleRenderCheckout = async () => {
    displayLoading();
    const countries = await this.countryService.getCountry();
    const products = this.cartModel.getCart();
    this.checkoutView.renderFormCheckout(products);
    this.checkoutView.handleRenderCountry(countries);
    this.checkoutView.setDefaultCountry(this.handleGetStates, countries);
    this.checkoutView.bindEventChangeCountry(this.handleGetStates);
    this.cartView.bindCloseModalCheckout();
    this.checkoutView.bindChangeCheckoutForm(this.handleChangeCheckoutForm);
    hideLoading();
  };

  handleChangeCheckoutForm = (
    fieldObject: Partial<Order>,
    fieldName: string
  ) => {
    const updatedFieldOrder = {
      ...this.orderModel.getOrder(),
      ...fieldObject,
    };
    this.orderModel.setOrder(updatedFieldOrder);
    const fieldErrorMess = this.orderModel.validate(fieldObject);
    const formErrorMess = { [fieldName]: fieldErrorMess };
    this.checkoutView.updateFormUi(formErrorMess);
  };
}
