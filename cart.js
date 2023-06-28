let cart = [];
let cartTotal = 0;
const cartDom = document.querySelector(".cart");
const addtocartbtnDom = document.querySelectorAll('[data-action="add-to-cart"]');

addtocartbtnDom.forEach((addtocartbtnDom) => {
  addtocartbtnDom.addEventListener("click", () => {
    const productDom = addtocartbtnDom.parentNode.parentNode;
    const product = {
      img: productDom.querySelector(".product-img").getAttribute("src"),
      name: productDom.querySelector(".product-name").innerText,
      price: productDom.querySelector(".product-price").innerText,
      quantity: 1,
    };

    const IsinCart = cart.filter((cartItem) => cartItem.name === product.name).length > 0;
    if (IsinCart === false) {
      cartDom.insertAdjacentHTML(
        "beforeend",
        `
          <div class="d-flex flex-row shadow-sm card cart-items mt-2 mb-3 flex-wrap">
            <div class="p-2">
                <img src="${product.img}" alt="${product.name}" style="max-width: 100px;"/>
            </div>
            <div class="p-2 mt-3">
                <p class="text-info cart-item-name">${product.name}</p>
            </div>
            <div class="p-2 mt-3 ml-5">
                <p class="text-success cart-item-price">${product.price}</p>
            </div>
            <div class="p-2 mt-3 ml-auto">
                <button class="btn badge badge-secondary" type="button" data-action="increase-item">&plus;</button>
            </div>
            <div class="p-2 mt-3">
              <p class="text-success cart-item-quantity">${product.quantity}</p>
            </div>
            <div class="p-2 mt-3">
              <button class="btn badge badge-info" type="button" data-action="decrease-item">&minus;</button>
            </div>
            <div class="p-2 mt-3">
              <button class="btn badge badge-danger" type="button" data-action="remove-item">&times;</button>
            </div>
          </div> `
      );

      if (document.querySelector(".cart-footer") === null) {
        cartDom.insertAdjacentHTML(
          "afterend",
          `
          <div class="shadow-sm card cart-footer mt-2 mb-3">
            <div class="p-2">
              <div class="discount">
                <input class="form-control" type="text" placeholder='Use "promo10" to get 10% off' data-action="promo-code">
              </div>
            </div>
            <div class="p-2 d-flex justify-content-between">
              <button class="btn badge-secondary" type="button" data-action="apply-discount">Get Discount</button>
              <button class="btn badge-dark" type="button" data-action="check-out">Pay <span class="pay"></span> &#10137;</button>
            </div>
            <div class="p-2">
              <button class="btn badge-danger" type="button" data-action="clear-cart">Clear Cart</button>
            </div>
          </div>`
        );
      }

      addtocartbtnDom.innerText = "In cart";
      addtocartbtnDom.disabled = true;
      cart.push(product);

      const cartItemsDom = cartDom.querySelectorAll(".cart-items");
      cartItemsDom.forEach((cartItemDom) => {
        if (cartItemDom.querySelector(".cart-item-name").innerText === product.name) {
          cartTotal +=
            parseInt(cartItemDom.querySelector(".cart-item-quantity").innerText) *
            parseInt(cartItemDom.querySelector(".cart-item-price").innerText);
          document.querySelector(".pay").innerText = "$" + cartTotal;

          // Increase item in cart
          cartItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => {
            const cartItem = cart.find((item) => item.name === product.name);

            if (cartItem) {
              cartItem.quantity++;
              const cartItemQuantity = cartItemDom.querySelector(".cart-item-quantity");
              const cartItemPrice = cartItemDom.querySelector(".cart-item-price");

              cartItemQuantity.innerText = cartItem.quantity;
              cartItemPrice.innerText = `${cartItem.quantity * parseInt(cartItem.price)} $`;

              cartTotal += parseInt(cartItem.price);
              document.querySelector(".pay").innerText = `$${cartTotal}`;
            }
          });

          // Decrease item in cart
          cartItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => {
            const cartItem = cart.find((item) => item.name === product.name);

            if (cartItem && cartItem.quantity > 1) {
              cartItem.quantity--;
              const cartItemQuantity = cartItemDom.querySelector(".cart-item-quantity");
              const cartItemPrice = cartItemDom.querySelector(".cart-item-price");

              cartItemQuantity.innerText = cartItem.quantity;
              cartItemPrice.innerText = `${cartItem.quantity * parseInt(cartItem.price)} $`;

              cartTotal -= parseInt(cartItem.price);
              document.querySelector(".pay").innerText = `$${cartTotal}`;
            }
          });

          // Remove item from cart
          cartItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => {
            cart.forEach((cartItem) => {
              if (cartItem.name === product.name) {
                cartTotal -= parseInt(cartItemDom.querySelector(".cart-item-price").innerText);
                document.querySelector(".pay").innerText = "$" + cartTotal;
                cartItemDom.remove();
                cart = cart.filter((cartItem) => cartItem.name !== product.name);
                addtocartbtnDom.innerText = "Add to cart";
                addtocartbtnDom.disabled = false;
              }
              if (cart.length < 1) {
                document.querySelector(".cart-footer").remove();
              }
            });
          });

          // Apply discount
          const discountInput = document.querySelector('[data-action="promo-code"]');

          document.querySelector('[data-action="apply-discount"]').addEventListener("click", () => {
            if (discountInput.value === "promo10") {
              // Calculate discount and update pay button
              const discountAmount = cartTotal * 0.1;
              const discountedTotal = cartTotal - discountAmount;
              document.querySelector(".pay").innerText = "$" + discountedTotal;
              document.querySelector('[data-action="apply-discount"]').disabled = true;
            }
          });
          // Clear cart
          document.querySelector('[data-action="clear-cart"]').addEventListener("click", () => {
            cartItemDom.remove();
            cart = [];
            cartTotal = 0;
            if (document.querySelector(".cart-footer") !== null) {
              document.querySelector(".cart-footer").remove();
            }
            addtocartbtnDom.innerText = "Add to cart";
            addtocartbtnDom.disabled = false;
          });
        }
      });
    }
  });
});
