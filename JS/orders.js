import { saveAddToCart, showQuantity } from "../JS/index.js";

document.querySelector(".cartNumber").innerHTML = showQuantity;

let totalOrders = document.querySelector(".totalOrders");

let saveHTML = "";

saveAddToCart.forEach((index) => {
  let { image, price, quantity, title } = index;
  const html = `
        <section>
            <div>
                <img src="${image}">
            </div>
            <div class="test">
                <p class="titleText">
                    ${title}
                </p>
                <p class="orderDate">
                    Arriving on: February 17 
                </p>
                <p class="orderQuantityText">Quantity: ${quantity} </p>
                <button class="buyItAgain">
                    Buy it Again
                </button>
                <button class="track">
                    Track package
                </button>
            </div>
            <div class="trackSection">
                <button class="track">
                    Track package
                </button>
            </div>
        </section> 
  `;
  saveHTML += html;
});
document.querySelector(".orders-section").innerHTML = saveHTML;

let totalPrice = 0;
saveAddToCart.forEach((item) => {
  totalPrice += (item.price * item.quantity) / 100;
});

totalOrders.innerHTML = totalPrice;

function leader(loaderTime) {
  setTimeout(() => {
    document.querySelector(".amazon-orders-main").style.display = "block";
    document.querySelector(".loader").style.display = "none";
  }, loaderTime);
}
leader(3000);
