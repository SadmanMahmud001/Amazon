import { saveAddToCart, showQuantity } from "../JS/index.js";

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let showQuantityValue =
  JSON.parse(localStorage.getItem("saveShowQuantity")) || 0;

let saveHTML = "";
saveAddToCart.forEach((index, radio) => {
  let { image, title, price, quantity } = index;
  let html = `
  <div class="items">
        <p class="title">Delivery date: Wednesday, February 12</p>
        <div class="cart-item-details">

            <div class="itemsImageDiv">
            <img
                class="itemsImage"
                src="${image}"
                alt="image"
            />
            </div>

            <div class="updateDelete">
                <p class="itemsTitle">
                ${title}
                </p>
                <p class="price">$${(price / 100).toFixed(2)}</p>
                <div class="updateDeleteButtons">
                    <p class="quantitytext">Quantity: ${quantity}</p>
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                </div>
            </div>

            <div class="choose">
            <div class="delivery-container">
                <h3>Choose a delivery option:</h3>
                <div class="delivery-option">
                <input type="radio" id="option1-${radio}" name="delivery-${radio}" checked />
                <label for="option1-${radio}">
                    <span class="date green">Tuesday, February 18</span>
                    <br />
                    <span class="shipping">FREE Shipping</span>
                </label>
                </div>

                <div class="delivery-option">
                <input type="radio" id="option2-${radio}" name="delivery-${radio}" />
                <label for="option2-${radio}">
                    <span class="date">Wednesday, February 12</span>
                    <br />
                    <span class="shipping">$4.99 - Shipping</span>
                </label>
                </div>

                <div class="delivery-option">
                <input type="radio" id="option3-${radio}" name="delivery-${radio}" />
                <label for="option3-${radio}">
                    <span class="date">Monday, February 10</span>
                    <br />
                    <span class="shipping">$9.99 - Shipping</span>
                </label>
                </div>
            </div>
            </div>
        </div>
    </div>
  `;
  saveHTML += html;
});

document.querySelector(".checkoutItem").innerHTML = saveHTML;

document.querySelector(
  ".checkoutItems p span"
).innerHTML = `${showQuantityValue} items`;

const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let itemElement = event.target.closest(".items");
    let itemTitle = itemElement.querySelector(".itemsTitle").innerText.trim();

    let itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.title.trim() === itemTitle
    );

    if (itemIndex !== -1) {
      let removedQuantity = cartItems[itemIndex].quantity;
      cartItems.splice(itemIndex, 1);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      showQuantityValue -= removedQuantity;
      localStorage.setItem(
        "saveShowQuantity",
        JSON.stringify(showQuantityValue)
      );

      itemElement.remove();

      document.querySelector(
        ".checkoutItems p span"
      ).innerHTML = `${showQuantityValue} items`;

      getOrderSummary();
    }
  });
});

function getOrderSummary() {
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += (item.price * item.quantity) / 100;
  });

  let orderSummaryItems = document.querySelector("main section");

  orderSummaryItems.innerHTML = `
      <div class="roderSummary">
          <p class="roderSummaryText">Order Summary</p>
  
          <div class="content">
              <section>
                  <p class="itemsSummary">Items (${showQuantityValue}) :</p>
                  <p class="itemsPrice">$${totalPrice.toFixed(2)}</p>
              </section>
              <section>
                  <p class="shipping">Shipping & handling :</p>
                  <p class="shippingPrice">$0.00</p> 
              </section>
              <section>
                  <p class="totalTax">Total before tax :</p>
                  <p class="taxPrice">$${totalPrice.toFixed(2)}</p>
              </section>
              <section>
                  <p class="estimatedTax">Estimated tax (10%) :</p>
                  <p class="estimatedTaxPrice">$${(totalPrice * 0.1).toFixed(
                    2
                  )}</p>
              </section>
          </div>
  
          <div class="line"></div>
  
          <div class="roderTotal">
              <p class="roderTotalText">Order total:</p>
              <p class="totalPrice">$${(totalPrice * 1.1).toFixed(2)}</p>
          </div>
  
          <div class="yourOrder">
              <button>Place your order</button>
          </div>
  
      </div>
    `;
}

getOrderSummary();

function leader(loaderTime) {
  setTimeout(() => {
    document.querySelector("main").style.display = "block";
    document.querySelector(".loader").style.display = "none";
  }, loaderTime);
}
leader(3000);
