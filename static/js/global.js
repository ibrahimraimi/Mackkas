/**
 * Mackkas Global UI Logic
 * Handles shared components like the Cart Drawer
 */

let Cart_Items = [];

// Core Cart Logic
async function FetchCart() {
    try {
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error("Failed to fetch cart");
        const data = await response.json();
        const items = Array.isArray(data) ? data : [];
        
        Cart_Items.length = 0;
        Cart_Items.push(...items);
        
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
        UpdateGlobalCartBadge(); // Refresh badge
    } catch (error) {
        console.error("Error syncing cart:", error);
    }
}

function UpdateCartUI() {
    const Cart_Items_Container = document.getElementById("cartItemsContainer");
    const Cart_Subtotal_Display = document.getElementById("cartSubtotal");
    const Cart_Count_Badge = document.getElementById("cartCountBadge");
    const Cart_Header_Count = document.querySelectorAll("#cartCountBadge");

    const totalQty = Cart_Items.reduce((acc, curr) => acc + curr.qty, 0);
    Cart_Header_Count.forEach(badge => badge.textContent = totalQty);

    if (!Cart_Items_Container) return;

    if (Cart_Items.length === 0) {
        Cart_Items_Container.innerHTML = `<div class="text-center" style="padding: 40px 0;">Your bag is empty.</div>`;
        if (Cart_Subtotal_Display) Cart_Subtotal_Display.textContent = "$0.00";
    } else {
        Cart_Items_Container.innerHTML = Cart_Items.map(item => `
            <div class="cart-item">
                <img src="${item.img1}" alt="${item.name}" class="cart-item__image">
                <div class="cart-item__details">
                    <p class="cart-item__category">${item.category || ''}</p>
                    <h4 class="cart-item__title">${item.name}</h4>
                    <div class="cart-item__quantity">
                        <button class="quantity-btn" onclick="UpdateQuantity(${item.id}, -1)">-</button>
                        <span style="font-size: 12px;">${item.qty}</span>
                        <button class="quantity-btn" onclick="UpdateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="cart-item__remove" onclick="RemoveFromCart(${item.id})">Remove</button>
                </div>
                <div style="text-align: right; font-size: 14px;">
                    $${(item.Price * item.qty).toFixed(2)}
                </div>
            </div>
        `).join("");

        const subtotal = Cart_Items.reduce((acc, curr) => acc + (curr.Price * curr.qty), 0);
        if (Cart_Subtotal_Display) Cart_Subtotal_Display.textContent = `$${subtotal.toFixed(2)}`;
    }
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

async function RemoveFromCart(id) {
    Cart_Items = Cart_Items.filter(i => i.id !== id);
    UpdateCartUI();
    await SyncCart();
}

// Global exposure for page-specific scripts
window.Cart_Items = Cart_Items;
window.FetchCart = FetchCart;
window.UpdateCartUI = UpdateCartUI;
window.UpdateQuantity = UpdateQuantity;
window.RemoveFromCart = RemoveFromCart;
window.SyncCart = SyncCart;

// Badge only update (legacy/efficient)
async function UpdateGlobalCartBadge() {
    const Cart_Count_Badge = document.getElementById("cartCountBadge");
    const Cart_Header_Count = document.querySelectorAll("#cartCountBadge");
    try {
        const response = await fetch('/api/cart');
        const cartItems = await response.json();
        const totalQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);
        Cart_Header_Count.forEach(badge => badge.textContent = totalQty);
    } catch (error) {
        console.error("Error syncing global cart:", error);
    }
}

window.UpdateGlobalCartBadge = UpdateGlobalCartBadge;

document.addEventListener('DOMContentLoaded', () => {
    const Cart_Drawer = document.getElementById("cartDrawer");
    const Cart_Overlay = document.getElementById("cartOverlay");
    const Open_Cart_Btn = document.getElementById("openCartBtn");
    const Close_Cart_Btn = document.getElementById("closeCartBtn");
    const Continue_Shopping_Btn = document.getElementById("continueShoppingBtn");

    // Toggle Cart Drawer
    if (Open_Cart_Btn) {
        Open_Cart_Btn.onclick = () => {
            Cart_Drawer.classList.remove("close_cart");
            Cart_Overlay.classList.remove("cart_blocker_hide");
            document.body.style.overflow = "hidden";
        };
    }

    const CloseCart = () => {
        if (Cart_Drawer) Cart_Drawer.classList.add("close_cart");
        if (Cart_Overlay) Cart_Overlay.classList.add("cart_blocker_hide");
        document.body.style.overflow = "auto";
    };

    if (Close_Cart_Btn) Close_Cart_Btn.onclick = CloseCart;
    if (Cart_Overlay) Cart_Overlay.onclick = CloseCart;
    if (Continue_Shopping_Btn) Continue_Shopping_Btn.onclick = CloseCart;

    FetchCart();

    // Mobile Menu Logic
    const Mobile_Menu = document.getElementById("mobileMenu");
    const Mobile_Menu_Overlay = document.getElementById("mobileMenuOverlay");
    const Open_Mobile_Menu_Btn = document.getElementById("openMobileMenu");
    const Close_Mobile_Menu_Btn = document.getElementById("closeMobileMenu");

    const OpenMobileMenu = () => {
        if (Mobile_Menu) Mobile_Menu.classList.add("active");
        if (Mobile_Menu_Overlay) Mobile_Menu_Overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const CloseMobileMenu = () => {
        if (Mobile_Menu) Mobile_Menu.classList.remove("active");
        if (Mobile_Menu_Overlay) Mobile_Menu_Overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    if (Open_Mobile_Menu_Btn) Open_Mobile_Menu_Btn.onclick = OpenMobileMenu;
    if (Close_Mobile_Menu_Btn) Close_Mobile_Menu_Btn.onclick = CloseMobileMenu;
    if (Mobile_Menu_Overlay) Mobile_Menu_Overlay.onclick = CloseMobileMenu;
});
