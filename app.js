// Declaring variables

const ul = document.querySelector("ul.receipt-list");
const categoryTitle = document.querySelector("h3.receipt-list");
const selectFilter = document.querySelector("select.food-categories");
const totalSpent = document.querySelector("span.total-spent");
let itemPricesOnPage;
let itemNamesOnPage;

// Declaring buttons

const azButton = document.querySelector("button.az");
const priceButton = document.querySelector("button.price-lth");

// Printing items to the page

const printFoodItems = () => { 
  
  receiptList.forEach(foodItem => {

    const listItem = document.createElement("li");
    listItem.setAttribute("class", "receipt-list");
    
    listItem.innerHTML = `${foodItem.name} <span class="item-price">${foodItem.currency}${foodItem.price.toFixed(2)}</span>`;
  
    ul.appendChild(listItem);

});
  // Callback to get the total of the new list items generated by pageload.
  getTotal();
}

// Invoke printFoodItems on page load 

window.addEventListener("load", printFoodItems);

// Calculate total 

const getTotal = () => {

  itemPricesOnPage = document.querySelectorAll("span.item-price");
  let totalArray = [];

  itemPricesOnPage.forEach(item => {
    totalArray.push((parseFloat(item.innerText.slice(1, item.innerText.length))));  
  });

  let receiptTotal = totalArray.reduce((x, y) => x + y, 0)

  totalSpent.innerHTML = `£${receiptTotal.toFixed(2)}`;

}

// Filtering the list

let whatsTheFilter = selectFilter.addEventListener("change", () => {

  if( selectFilter.value !== "all" ) {

    let checkItems = receiptList.filter( item => item.type === selectFilter.value );

    categoryTitle.innerHTML = selectFilter.value;
    //Needed to clear the ul element as append was just adding it to the end.
    ul.innerHTML = "";
  
    checkItems.forEach(indexItem => {
  
      const listItem = document.createElement("li");
      listItem.setAttribute("class", "receipt-list");
      
      listItem.innerHTML = `${indexItem.name} <span class="item-price">${indexItem.currency}${indexItem.price.toFixed(2)}</span>`;
    
      ul.appendChild(listItem);
  
    });

  } else if (selectFilter.value === "all") {
    
    ul.innerHTML = "";
    receiptList.forEach(foodItem => {

    const listItem = document.createElement("li");
    listItem.setAttribute("class", "receipt-list");
    
    listItem.innerHTML = `${foodItem.name} <span class="item-price">${foodItem.currency}${foodItem.price.toFixed(2)}</span>`;
    ul.appendChild(listItem);
    categoryTitle.innerHTML = "All Items";

    });
  }
  // Callback to get the total of the new list items generated by the selection
  getTotal();
});

// Reduces the filter list to avoid having repeats in the list
const filterCount = receiptList.reduce((obj, filterItem) => {

  //Initially trying to do [filterItem].type
  if( !obj[filterItem.type] ) {
    obj[filterItem.type] = 0;
  } 

  obj[filterItem.type]++;
  return(obj);

}, {});

// Gets the key values from above, then runs through a forEach 

let createFilterOption = Object.keys(filterCount).forEach(foodItem => {

  const filterOption = document.createElement("option");
  filterOption.setAttribute("value", `${foodItem}`);
  
  filterOption.innerHTML = `${foodItem}`;

  selectFilter.appendChild(filterOption);

});

// Event listener to sort list a-z 

azButton.addEventListener("click", () => {

  itemNamesOnPage = document.querySelectorAll("li.receipt-list");

  const azSorted = Array.from(itemNamesOnPage).sort((firstItem, secondItem) => firstItem.textContent > secondItem.textContent ? 1 : -1);

  ul.innerHTML = azSorted.map(item => 
    `<li class="receipt-list">${item.innerHTML}</li>`
    ).join("");

});


// Event listener to sort price low to high 

priceButton.addEventListener("click", () => {

  // Get each li item and contents 
  itemNamesOnPage = document.querySelectorAll("li.receipt-list");

  // Create empty array 
  let itemArray = [];

  // Run through and split the item to target the price only
  itemNamesOnPage.forEach(

    item => { 
    
      let splitItem = item.textContent.split("£");
      itemArray.push(splitItem);

  });

  // Sort and map the items back onto the page
  let priceSortedItems = itemArray.sort((firstItem, secondItem) => parseFloat(firstItem[1]) > parseFloat(secondItem[1]) ? 1 : -1);

  ul.innerHTML = priceSortedItems.map(
    
    item => 

    `<li class="receipt-list">${item[0]}<span class="item-price">£${item[1]}</span></li>`

    ).join("");

});

