
console.log('Script loaded');

const products = getAvailableProducts();
const productsUl = document.querySelector('ul');
const inputsWrapper = document.querySelector('.selector');
console.log(inputsWrapper)

inputsWrapper.insertAdjacentHTML("beforeend", `<label class="label">
  <input type="text" data-name="filter" placeholder="Search for a product"/>
  </label>`);

inputsWrapper.insertAdjacentHTML("beforeend", `<label class="label">
  <input type="number" data-name="sort" placeholder="Set maximum price"/>
  </label>`);

const sortInput = document.querySelector("[data-name=sort]");   
const filterInput = document.querySelector("[data-name=filter]"); 

filterInput.addEventListener("input", onFilterInputChange);
sortInput.addEventListener("input", onSortInputChange);


function renderProducts(products) {
    products.forEach(product => {
      const items = document.createElement("li");
      items.classList.add("product-card")
        items.innerHTML = `
            <ul class="products-item">
                <li class="product-name">${product.name}</li>
                <li class="product-price"> price: ${product.price}</li>
                <li class="product-rating"> rating: ${product.rating}</li>
            </ul>
        `;
        productsUl.appendChild(items);
    });
}

renderProducts(products);



function onFilterInputChange(event) {
  const filteredByNameProducts = products.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()));
  
  productsUl.innerHTML = " ";
  renderProducts(filteredByNameProducts);

  if (event.target.value === "") {
    renderProducts(products);
  }
}

function onSortInputChange (event) {
  const maxPrice = Number(event.target.value);
  const filteredByPriceProducts = products.filter(product => product.price <= maxPrice).sort((a,b) => a.price - b.price );
  
  productsUl.innerHTML = " ";
  renderProducts(filteredByPriceProducts);

  if (event.target.value === "") {
   renderProducts(products);
  }

  }
