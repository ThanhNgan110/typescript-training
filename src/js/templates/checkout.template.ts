import { cartSum } from "./cart.template";
import Product from "../type/product";

let total = "";

export const orderSummary = (products: Product[]) => {
  const cartSummery = cartSum(products);
  total = cartSummery.total;
  let content = "";
  products.forEach((product) => {
    content += orderSummeryTemplate(product);
  });
  return `
  ${formCheckoutTemplate()}
  <div class="flex-col">
    <div class="cart-order">
      <div class="block-products">
        <p class="name-total">Order Summary</p>
        ${content}
      </div>
      <p class="name-total-border">Subtotal:<span>$${total}</span></p>
      <p class="name-total-border">Shipping:<span>Free</span></p>
      <p class="name-total-border-none total">Total:<span>$${total}</span></p>
      <button id="btn-order" type="submit" form="form-checkout" class="btn btn-order" disabled>Place Order</button>
    </div>
  <button id="btn-close-checkout" class="btn btn-return">Return to shop</button>
  </div>
  `;
};

export const orderSummeryTemplate = (product: Product) => {
  const { imgURL, name, amount, price } = product;
  return `<div>
          <div class="flex justify-content-between align-center">
            <div class="flex align-center">
              <img style="width:100px" src="${imgURL}" alt="${name}" />${name} x ${amount}
            </div>
            <p>$${price * amount}</p>
          </div>
        </div>
    `;
};

export const formCheckoutTemplate = () => {
  return `<div class="form-checkout">
    <p class="title-checkout">Billing Information</p>
    <form id="form-checkout" action="javascript:void(0)">
      <div class="flex-row form-row">
        <div class="flex-col flex-col-1">
          <label for="First Name">First name</label>
          <input class="form-control form-control-sm" type="text" id="First Name" name="firstName" placeholder="Your first name">
          <p class="mess-error error"></p>
        </div>
        <div class="flex-col flex-col-1">
          <label for="Last Name">Last name</label>
          <input class="form-control form-control-sm" type="text" id="Last Name" name="lastName" placeholder="Your last name">
          <p class="mess-error error"></p>
        </div>
        <div class="flex-col flex-col-1">
          <label for="Company Name">Company name</label>
          <input class="form-control form-control-sm" type="text" id="Company Name" name="companyName" placeholder="Company name">
          <p class="mess-error error"></p>
        </div>
      </div>
      <div class="form-row">
        <label for="Address">Street Address</label>
        <input class="form-control form-control-sm input-default" type="text" id="Address" name="address" placeholder="Address">
        <p class="mess-error error"></p>
      </div>
      <div class="flex-row form-row">
        <div class="flex-col flex-col-2">
          <label for="country name-label">Country / Region</label>
          <select class="form-control form-control-sm" name="country" id="country">
          </select>
        </div>
        <div class="flex-col flex-col-2">
          <label for="lstates name-label">States</label>
          <select class="form-control form-control-sm" name="states" id="states">
          </select>
        </div>
        <div class="flex-col flex-col-2">
          <label for="Zip Code">Zip Code</label>
          <input class="form-control form-control-sm" type="text" id="Zip Code" name="zipCode" placeholder="Zip Code">
          <p class="mess-error error"></p>
        </div>
      </div>
      <div class="flex-row form-row">
        <div class="flex-col flex-col-3">
          <label for="Email">Email</label>
          <input class="form-control form-control-sm" type="email" id="Email" name="email" placeholder="Email Address">
          <p class="mess-error error"></p>
        </div>
        <div class="flex-col flex-col-3">
          <label for="Phone Number">Phone</label>
          <input class="form-control form-control-sm" type="text" id="Phone Number" name="phoneNumber" placeholder="Phone number">
          <p class="mess-error error"></p>
        </div>
      </div>
      <div class="block-info-checkout">
        <p class="title-info">Additional Information</p>
        <div class="flex-col">
          <label class="name-label" for="Note">Order Notes (Optional)</label>
          <textarea class="form-control form-control-lg" id="Note" name="note" rows="2" cols="60"
            placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
            <p class="mess-error error"></p>
        </div>
      </div>
    </form>
  </div>
  `;
};
