import { cart } from "../Data/cartData.js";

let saveCartHTML = "";

cart.forEach((index) => {
  let { image, title, ratingStar, ratingText, price } = index;

  let html = `
      <div class="cart-section">
        <div class="cart-image">
          <img src="${image}" alt="image">
        </div>
        <div class="cart-text">
          <div class="cart-title">
            <p>${title}</p>
          </div>
          <div class="cart-rating">
            <img src="${ratingStar}" alt="rating">
            <p class="rating-text">${ratingText}</p>
          </div>
          <div class="cart-price">
            <p>$${(price / 100).toFixed(2)}</p>
          </div>
          <div class="select-quantity">
            <select class="quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="add-to-cart-text">Added</div>
          <div class="add-to-cart-button">
            <button id="js-add-to-cart">Add to Cart</button>
          </div>
        </div>
     </div>
  `;
  saveCartHTML += html;
});

let cartContainer = document.querySelector(".cart-container");
if (cartContainer) {
  cartContainer.innerHTML = saveCartHTML;
}

let addToCartButtons = document.querySelectorAll("#js-add-to-cart");
let quantities = document.querySelectorAll(".quantity");

export let saveAddToCart = JSON.parse(localStorage.getItem("cartItems")) || [];

export let showQuantity =
  JSON.parse(localStorage.getItem("saveShowQuantity")) || 0;

let cartNumber = document.querySelector(".cartNumber");
if (cartNumber) {
  cartNumber.innerHTML = showQuantity;
}

addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let saveItem = cart[index];
    let quantity = Number(quantities[index].value);

    let existingItem = saveAddToCart.find(
      (item) => item.title === saveItem.title
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      saveItem.quantity = quantity;
      saveAddToCart.push(saveItem);
    }

    showQuantity += quantity;
    localStorage.setItem("saveShowQuantity", JSON.stringify(showQuantity));
    if (cartNumber) {
      cartNumber.innerHTML = showQuantity;
    }

    localStorage.setItem("cartItems", JSON.stringify(saveAddToCart));

    document.querySelectorAll(".add-to-cart-text").forEach((element) => {
      element.addEventListener("click", () => {
        element.style.opacity = "1";
        setTimeout(() => {
          element.style.opacity = "0";
        }, 1000);
      });
    });
  });
});

function loader(loaderTime) {
  setTimeout(() => {
    document.querySelector("main").style.display = "block";
    document.querySelector("header").style.display = "flex";
    document.querySelector(".loader").style.display = "none";
  }, loaderTime);
}
loader(3000);

//menu

function menu() {
  const menuSection = document.querySelector(".menuSection");
  const menuDropdownContainer = document.querySelector(
    ".menuDropdownContainer"
  );
  const body = document.body;

  if (!menuSection || !menuDropdownContainer) {
    console.error("Menu elements not found");
    return;
  }

  const menuDropdownText = document.querySelector(".menuDropdown a span");

  if (menuDropdownText && typeof showQuantity !== "undefined") {
    menuDropdownText.innerHTML = showQuantity;
  }

  menuDropdownContainer.style.transform = "translateX(-680px)";

  menuSection.addEventListener("click", () => {
    menuDropdownContainer.style.transform =
      menuDropdownContainer.style.transform === "translateX(-680px)"
        ? "translateX(0)"
        : "translateX(-680px)";
  });
}

document.addEventListener("DOMContentLoaded", menu);
