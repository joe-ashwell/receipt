const ul = document.querySelector("ul.receipt-list");
const totalSpent = document.querySelector("span.total-spent");
const itemPricesOnPage = document.querySelectorAll("span.item-price");

const azButton = document.querySelector("button.az");
const priceButton = document.querySelector("button.price-lth");

let printFoodItems = receiptList.forEach(foodItem => {

  const listItem = document.createElement("li");
  listItem.setAttribute("class", "receipt-list");
  
  listItem.innerHTML = `${foodItem.name} <span class="item-price">${foodItem.currency}${foodItem.price}</span>`;

  ul.appendChild(listItem);

});

azButton.addEventListener("click", () => {

  const azSorted = receiptList.sort((firstItem, secondItem) => firstItem.name > secondItem.name ? 1 : -1);

  ul.innerHTML = azSorted.map(item => 

    `<li class="receipt-list">${item.name} <span class="item-price">${item.currency}${item.price}</span>`

    ).join("");

});


priceButton.addEventListener("click", () => {

  const priceSorted = receiptList.sort((firstItem, secondItem) => firstItem.price > secondItem.price ? 1 : -1);

  ul.innerHTML = priceSorted.map(item => 

    `<li class="receipt-list">${item.name} <span class="item-price">${item.currency}${item.price}</span>`

    ).join("");

})




