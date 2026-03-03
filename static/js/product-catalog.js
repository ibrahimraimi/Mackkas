const Product_Grid = document.getElementById("productGrid");
const Cart_Drawer = document.getElementById("cartDrawer");
const Cart_Overlay = document.getElementById("cartOverlay");
const Open_Cart_Btn = document.getElementById("openCartBtn");
const Close_Cart_Btn = document.getElementById("closeCartBtn");
const Continue_Shopping_Btn = document.getElementById("continueShoppingBtn");
const Cart_Items_Container = document.getElementById("cartItemsContainer");
const Cart_Count_Badges = document.querySelectorAll("#cartCountBadge");
const Cart_Subtotal_Display = document.getElementById("cartSubtotal");
const Product_Count_Text = document.getElementById("productCountText");

let All_Products = [];
let Cart_Items = [];

// Initialize
async function Init() {
    await FetchProducts();
    await FetchCart();
    SetupEventListeners();
    RenderProducts(All_Products);
}

async function FetchProducts() {
    try {
        const response = await fetch('/api/products');
        All_Products = await response.json();
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

function SetupEventListeners() {
    Open_Cart_Btn.onclick = OpenCart;
    Close_Cart_Btn.onclick = CloseCart;
    Cart_Overlay.onclick = CloseCart;
    Continue_Shopping_Btn.onclick = CloseCart;
}

function OpenCart() {
    Cart_Drawer.classList.remove("close_cart");
    Cart_Overlay.classList.remove("cart_blocker_hide");
    document.body.style.overflow = "hidden";
}

function CloseCart() {
    Cart_Drawer.classList.add("close_cart");
    Cart_Overlay.classList.add("cart_blocker_hide");
    document.body.style.overflow = "auto";
}

function RenderProducts(products) {
    Product_Grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-card__image-wrapper">
                <img src="${product.img1}" alt="${product.name}" class="product-card__image">
            </div>
            <div class="product-card__details">
                <p class="product-card__category">${product.category} / ${product.cloth}</p>
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__price">${product.price}</p>
                <button class="button button--primary w-full m-0" style="padding: 10px; font-size: 10px; margin-top: 15px;" onclick="AddToCart(${product.id})">
                    Add to Bag
                </button>
            </div>
        </div>
    `).join("");
    
    Product_Count_Text.textContent = `${products.length} Items`;
}

async function AddToCart(id) {
    const product = All_Products.find(p => p.id === id);
    if (!product) return;

    const existingItem = Cart_Items.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        Cart_Items.push({ ...product, qty: 1 });
    }

    UpdateCartUI();
    await SyncCart();
    OpenCart();
}

async function UpdateQuantity(id, delta) {
    const item = Cart_Items.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        Cart_Items = Cart_Items.filter(i => i.id !== id);
    }

    UpdateCartUI();
    await SyncCart();
}

function UpdateCartUI() {
    // Update badge
    const totalQty = Cart_Items.reduce((acc, curr) => acc + curr.qty, 0);
    Cart_Count_Badges.forEach(badge => badge.textContent = totalQty);

    // Render items
    if (Cart_Items.length === 0) {
        Cart_Items_Container.innerHTML = `<div class="text-center" style="padding: 40px 0;">Your bag is empty.</div>`;
        Cart_Subtotal_Display.textContent = "$0.00";
    } else {
        Cart_Items_Container.innerHTML = Cart_Items.map(item => `
            <div class="cart-item">
                <img src="${item.img1}" alt="${item.name}" class="cart-item__image">
                <div class="cart-item__details">
                    <p class="cart-item__category">${item.category}</p>
                    <h4 class="cart-item__title">${item.name}</h4>
                    <div class="cart-item__quantity">
                        <button class="quantity-btn" onclick="UpdateQuantity(${item.id}, -1)">-</button>
                        <span style="font-size: 12px;">${item.qty}</span>
                        <button class="quantity-btn" onclick="UpdateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div style="text-align: right; font-size: 14px;">
                    $${(item.Price * item.qty).toFixed(2)}
                </div>
            </div>
        `).join("");

        const subtotal = Cart_Items.reduce((acc, curr) => acc + (curr.Price * curr.qty), 0);
        Cart_Subtotal_Display.textContent = `$${subtotal.toFixed(2)}`;
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

function HandleSort(criteria) {
    let sorted = [...All_Products];
    if (criteria === 'price-low') {
        sorted.sort((a, b) => a.Price - b.Price);
    } else if (criteria === 'price-high') {
        sorted.sort((a, b) => b.Price - a.Price);
    }
    RenderProducts(sorted);
}

// Start
Init();
