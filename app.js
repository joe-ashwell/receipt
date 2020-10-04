// ===================================
// ======= Declaring variables =======
// ===================================
const ul = document.querySelector("ul.receipt-list");
const categoryTitle = document.querySelector("h3.receipt-list");
const itemPricesOnPage = document.querySelectorAll("span.item-price");
const selectFilter = document.querySelector("select.food-categories");
let totalSpent;

// ===================================
// =======  Declaring buttons  =======
// ===================================
const azButton = document.querySelector("button.az");
const priceButton = document.querySelector("button.price-lth");

// ===================================
// ========  Calculate total  ========
// ===================================

// Needed to change to getElementsByClassName as querySelectorAll generated a static list. -- also didn't work with span.class
const getTotal = () => {
  totalSpent = document.querySelectorAll("span.total-spent");

  itemPricesOnPage.forEach(item => {
    console.log(parseFloat(item.innerText.slice(1, item.innerText.length)));  
  });
}


// ===================================
// ======= Filtering the list  =======
// ===================================

let whatsTheFilter = selectFilter.addEventListener("change", () => {

  if( selectFilter.value !== "all" ) {

    let checkItems = receiptList.filter( item => item.type === selectFilter.value );

    categoryTitle.innerHTML = selectFilter.value;
    //Needed to clear the ul element as append was just adding it to the end.
    ul.innerHTML = "";
  
    checkItems.forEach(indexItem => {
  
      const listItem = document.createElement("li");
      listItem.setAttribute("class", "receipt-list");
      
      listItem.innerHTML = `${indexItem.name} <span class="item-price">${indexItem.currency}${indexItem.price}</span>`;
    
      ul.appendChild(listItem);
  
    });

  } else if (selectFilter.value === "all") {
    
    ul.innerHTML = "";
    receiptList.forEach(foodItem => {

    const listItem = document.createElement("li");
    listItem.setAttribute("class", "receipt-list");
    
    listItem.innerHTML = `${foodItem.name} <span class="item-price">${foodItem.currency}${foodItem.price}</span>`;
  
    ul.appendChild(listItem);

    categoryTitle.innerHTML = "All Items";

    });
  }

});

// ============================================
// =======  Printing items to the page  =======
// ============================================
let printFoodItems = receiptList.forEach(foodItem => {

    const listItem = document.createElement("li");
    listItem.setAttribute("class", "receipt-list");
    
    listItem.innerHTML = `${foodItem.name} <span class="item-price">${foodItem.currency}${foodItem.price}</span>`;
  
    ul.appendChild(listItem);

});

// =============================================================================
// =======  Reduces the filter list to avoid having repeats in the list  =======
// =============================================================================
const filterCount = receiptList.reduce((obj, filterItem) => {

  //Initially trying to do [filterItem].type
  if( !obj[filterItem.type] ) {
    obj[filterItem.type] = 0;
  } 

  obj[filterItem.type]++;
  return(obj);

}, {});

// =============================================================================
// =======  Gets the key values from above, then runs through a forEach  =======
// =============================================================================
let createFilterOption = Object.keys(filterCount).forEach(foodItem => {

  const filterOption = document.createElement("option");
  filterOption.setAttribute("value", `${foodItem}`);
  
  filterOption.innerHTML = `${foodItem}`;

  selectFilter.appendChild(filterOption);

});

// =============================================================================
// =====================  Event listener to sort list a-z  =====================
// =============================================================================
azButton.addEventListener("click", () => {

  const azSorted = receiptList.sort((firstItem, secondItem) => firstItem.name > secondItem.name ? 1 : -1);

  ul.innerHTML = azSorted.map(item => 

    `<li class="receipt-list">${item.name} <span class="item-price">${item.currency}${item.price}</span>`

    ).join(""); // Added .join to remove the annoying comma in arrays

});

// =============================================================================
// ================= Event listener to sort price low to high ==================
// =============================================================================
priceButton.addEventListener("click", () => {

  const priceSorted = receiptList.sort((firstItem, secondItem) => firstItem.price > secondItem.price ? 1 : -1);

  ul.innerHTML = priceSorted.map(item => 

    `<li class="receipt-list">${item.name} <span class="item-price">${item.currency}${item.price}</span>`

    ).join("");

});

