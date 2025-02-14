import { saveAddToCart, showQuantity } from "../JS/index.js";

document.querySelector(".cartNumber").innerHTML = showQuantity;

let totalOrders = document.querySelector(".totalOrders");

let saveHTML = "";

const today = new Date();

const twoDaysAgo = new Date();
twoDaysAgo.setDate(today.getDate() - 2);

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(date) {
  const dayOfWeek = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
}

const formattedToday = formatDate(today);
const formattedTwoDaysAgo = formatDate(twoDaysAgo);

console.log("Today's Date:", formattedToday);
console.log("Date 2 Days Ago:", formattedTwoDaysAgo);
let dateElement = document.querySelector(".dateElement");
if (dateElement) {
  dateElement.innerHTML = formattedToday;
}

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
                    Arriving on: ${formattedToday}
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
