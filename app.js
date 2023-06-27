let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
            <div class="col-sm-6 col-md-6 col-lg-6 col-xs-6">
              <div class="shadow-sm card mb-3 product">
                <img class="product-img" src="${product.image}" />
               
                <div class="card-body">
                  <h5 class="card-title text-info bold product-name">${product.name}</h5>
                
                  <p class="card-text text-success product-price">${product.price}</p>
                 
                  <button class="btn btn-primary" type="button" data-action="add-to-cart">Add to cart</button>
                </div>
              </div>
            </div>
  `;
});

document.querySelector(".product-container").innerHTML = productsHTML;
