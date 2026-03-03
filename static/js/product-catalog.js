let Product_Container = document.querySelector(".product");
let Cart = document.querySelector(".close_cart");
let Close_Cart = document.getElementById("close");
let Open_Cart = document.querySelector(".cart_icon");
let Cart_Items = [];
let List_Cart = document.querySelector(".list_cart");
let List_Number= document.querySelector(".number");
let Overall = document.querySelector(".total")
let Purchase = document.querySelector(".success_hide")
let Pending = document.querySelector(".pending_hide")
const Slide_value = document.querySelector(".slide-value");
const Slider = document.getElementById("range");
let Item_Search = document.querySelector(".search_input")
let Button_Icon = document.querySelector(".btn_icon")
let not_in_cart = document.querySelector(".not-in-cart");
let category_Button = document.getElementById("categoryBtn")
let Category_Menu = document.querySelector(".category")
let category_opacity = document.querySelector(".category_blocker_hide")
let cart_opacity = document.querySelector(".cart_blocker_hide")
let None_In_Cart = document.querySelector(".nothing-in-cart_hide")
let Items = []; // Fetched from API

// Get logged-in user
let CurrentUser = sessionStorage.getItem("currentUser");

if(CurrentUser){
  let ParsedUser = JSON.parse(CurrentUser);
  let NameDisplay = document.querySelector(".name_user");
  if(NameDisplay) NameDisplay.textContent = ParsedUser.Name;
}

async function FetchProducts() {
    try {
        const response = await fetch('/api/products');
        Items = await response.json();
        GenerateItems(Items);
        await FetchCart();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function FetchCart() {
    try {
        const response = await fetch('/api/cart');
        Cart_Items = await response.json();
        UpdateCartUI();
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
}

async function SyncCart() {
    try {
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: Cart_Items })
        });
    } catch (error) {
        console.error("Error syncing cart:", error);
    }
}

function GenerateItems(items_to_render) {
    Product_Container.innerHTML = "";
    items_to_render.forEach((item, i) => {
        let isAdded = Cart_Items.some(cart_item => cart_item.id === item.id);
        let buttonText = isAdded ? "Added To Cart" : "Add to Cart";
        let buttonStyle = isAdded ? "background-color: #5a2823; font-size: 12px;" : "background-color: #e74c3c;";

        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <div class="product-images">
              <img src="${item.img1}" alt="${item.name}">
              <img id="Suit2" src="${item.img2 || item.img1}" alt="${item.name}">
            </div>
            <div class="texts">
              <div class="pb">
                <h4 class="product-name">${item.name}</h4>
                <h3 class="product-price">${item.price}</h3>
              </div>
              <div class="description">
                <span class="product-description">${item.desc}</span> 
                <div class="star-rating">
                    ${[1, 2, 3, 4, 5].map(star => `
                        <div class="star-rate-${star}">
                            <input type="radio" name="star${i + 1}" id="star${i + 1}-${star}">
                            <label for="star${i + 1}-${star}"><iconify-icon class="star${i + 1}" icon="material-symbols:star"></iconify-icon></label>
                        </div>
                    `).join('')}
                </div>
              </div>
            </div>
            <button id="prod-btn-${item.id}" class="add_to_cart" style="${buttonStyle}">${buttonText}</button>
        `;
        
        itemDiv.querySelector('.add_to_cart').onclick = () => AddToCart(item.id);
        Product_Container.appendChild(itemDiv);
    });
    SetupStars();
}

function SetupStars() {
    for (let i = 1; i <= Items.length; i++) {
        const randomIndex = Math.floor(Math.random() * 5) + 1;
        const Stars = document.querySelectorAll(`.star${i}`)
        Stars.forEach((star, index) => {
            star.style.color = index >= randomIndex ? "white" : "gold";
        });
    }
}

async function AddToCart(id) {
    let item = Items.find(item => item.id === id);
    let button = document.getElementById(`prod-btn-${id}`);

    if (Cart_Items.some(cart_item => cart_item.id === id)) {
        not_in_cart.className = "already-in-cart";
        setTimeout(() => not_in_cart.className = "not-in-cart", 3000);
        return;
    }

    Cart_Items.push({...item});
    button.textContent = "Added To Cart";
    button.style.backgroundColor = "#5a2823";
    button.style.fontSize = "12px";
    
    UpdateCartUI();
    await SyncCart();
}

function UpdateCartUI() {
    List_Number.textContent = Cart_Items.reduce((acc, curr) => acc + curr.qty, 0);
    List_Cart.innerHTML = Cart_Items.map(item => `
        <div class="cart_item">
            <div class="cartitem_image"><img src="${item.img1}" alt="${item.name}"></div>
            <div class="cartitem_name"><h3>${item.name}</h3></div>
            <div class="cartitem_price"><p>${item.price}</p></div>
            <div class="cartitem_quantity">
                <span class="minus" onclick="UpdateQuantity('${item.id}', -1)">-</span>
                <span class="digit">${item.qty}</span>
                <span class="plus" onclick="UpdateQuantity('${item.id}', 1)">+</span>
            </div>
        </div>
    `).join("");
    
    let grandTotal = Cart_Items.reduce((acc, curr) => acc + curr.Price * curr.qty, 0);
    Overall.innerHTML = `<span style="color: white">Total Price: </span>$${grandTotal}`;
}

async function UpdateQuantity(id, change) {
    let item = Cart_Items.find(item => item.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty < 1) {
        Cart_Items = Cart_Items.filter(item => item.id !== id);
        let button = document.getElementById(`prod-btn-${id}`);
        if (button) {
            button.textContent = "Add to Cart";
            button.style.backgroundColor = "#e74c3c";
            button.style.fontSize = "";
        }
    }
    
    UpdateCartUI();
    await SyncCart();
}

Close_Cart.addEventListener("click", () => {
    Cart.className = "close_cart";
    cart_opacity.className = "cart_blocker_hide";
});

Open_Cart.addEventListener("click", () => {
    Cart.className = "cart";
    cart_opacity.className = "cart_blocker";
});

async function Buy() {
    if (Cart_Items.length === 0) {
        None_In_Cart.className = "nothing-in-cart";
        setTimeout(() => None_In_Cart.className = "nothing-in-cart_hide", 2000);
        return;
    }

    Pending.className = "pending";
    setTimeout(async () => {
        Pending.className = "pending_hide";
        Purchase.className = "success";
        
        Cart_Items = [];
        await SyncCart();
        UpdateCartUI();
        GenerateItems(Items); // Reset buttons

        setTimeout(() => Purchase.className = "success_hide", 2000);
    }, 2000);
}

Slider.oninput = () => {
    let Value = Slider.value;
    Slide_value.textContent = "$" + Value;
    Slide_value.style.left = (Value / 20) + "%";
    Slide_value.classList.add("show");
};

Slider.onblur = () => Slide_value.classList.remove("show");

Item_Search.addEventListener("keyup", () => {
    let filtered = Items.filter(item => item.name.toLowerCase().includes(Item_Search.value.toLowerCase()));
    GenerateItems(filtered);
});

Slider.addEventListener("mouseup", () => {
    let filtered = Items.filter(item => item.Price <= Slider.value);
    GenerateItems(filtered);
});

function filter(selectedFilter) {
    let filtered = Items;
    if (selectedFilter === 'Men') filtered = Items.filter(i => i.category === 'men');
    else if (selectedFilter === 'Women') filtered = Items.filter(i => i.category === 'women');
    else if (selectedFilter === 'Suits') filtered = Items.filter(i => i.cloth === 'suit');
    else if (selectedFilter === 'Gown') filtered = Items.filter(i => i.cloth === 'gown');
    else if (selectedFilter === 'Watches') filtered = Items.filter(i => i.cloth === 'watch');
    else if (selectedFilter === 'Bags') filtered = Items.filter(i => i.cloth === 'bag');
    
    GenerateItems(filtered);
}

category_Button.addEventListener("click", () => {
    Category_Menu.className = "category_bringback";
    category_opacity.className = "category_blocker";
});

document.addEventListener("click", (e) => {
    let Category_M = document.querySelector(".category_bringback");
    if (Category_M && e.target !== category_Button && !category_Button.contains(e.target) && !Category_M.contains(e.target)) {
        Category_M.className = "category";
        category_opacity.className = "category_blocker_hide";
    }
});

FetchProducts();
