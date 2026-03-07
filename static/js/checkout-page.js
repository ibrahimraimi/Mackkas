const Checkout_Form = document.getElementById("checkoutForm");
const Checkout_Items_Container = document.getElementById("checkoutItems");
const Checkout_Subtotal = document.getElementById("checkoutSubtotal");
const Checkout_Total = document.getElementById("checkoutTotal");
const Success_Modal = document.getElementById("successModal");
const Success_Overlay = document.getElementById("successOverlay");
const Order_Id_Span = document.getElementById("orderId");

async function InitCheckout() {
    await FetchCart();
    
    if (Cart_Items.length === 0) {
        window.location.href = '/mackkas';
        return;
    }
    
    RenderCheckoutSummary();
    SetupForm();
}

async function UpdateQuantity(id, delta) {
    const item = Cart_Items.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        Cart_Items = Cart_Items.filter(i => i.id !== id);
    }

    RenderCheckoutSummary();
    await SyncCart();
    
    if (Cart_Items.length === 0) {
        window.location.href = '/mackkas';
    }
}

async function RemoveFromCart(id) {
    Cart_Items = Cart_Items.filter(i => i.id !== id);
    RenderCheckoutSummary();
    await SyncCart();
    
    if (Cart_Items.length === 0) {
        window.location.href = '/mackkas';
    }
}

async function SyncCart() {
    try {
        await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: Cart_Items })
        });
        
        // Refresh global cart badge if possible
        if (typeof UpdateGlobalCartBadge === 'function') {
            UpdateGlobalCartBadge();
        }
    } catch (error) {
        console.error("Error syncing cart:", error);
    }
}

function RenderCheckoutSummary() {
    Checkout_Items_Container.innerHTML = Cart_Items.map(item => `
        <div class="checkout-item">
            <img src="${item.img1}" alt="${item.name}" class="checkout-item__img">
            <div class="checkout-item__details">
                <h4>${item.name}</h4>
                <div class="cart-item__quantity" style="margin-top: 5px; scale: 0.85; transform-origin: left; height: 32px;">
                    <button class="quantity-btn" onclick="UpdateQuantity(${item.id}, -1)">-</button>
                    <span style="font-size: 12px; min-width: 20px; text-align: center;">${item.qty}</span>
                    <button class="quantity-btn" onclick="UpdateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="cart-item__remove" onclick="RemoveFromCart(${item.id})" style="font-weight: 500;">REMOVE</button>
            </div>
            <div style="font-size: 16px; font-weight: 600; text-align: right;">
                $${(item.Price * item.qty).toFixed(2)}
            </div>
        </div>
    `).join("");

    const subtotal = Cart_Items.reduce((acc, curr) => acc + (curr.Price * curr.qty), 0);
    Checkout_Subtotal.textContent = `$${subtotal.toFixed(2)}`;
    Checkout_Total.textContent = `$${subtotal.toFixed(2)}`;
}

function SetupForm() {
    Checkout_Form.onsubmit = async (e) => {
        e.preventDefault();
        
        const btn = document.getElementById("completePurchaseBtn");
        btn.disabled = true;
        btn.textContent = "Processing...";

        try {
            const response = await fetch('/api/order/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();

            if (response.ok) {
                Order_Id_Span.textContent = result.order_id;
                Success_Overlay.classList.remove("cart_blocker_hide");
                Success_Modal.classList.remove("cart_blocker_hide");
                
                // Refresh global cart badge
                if (typeof UpdateGlobalCartBadge === 'function') {
                    UpdateGlobalCartBadge();
                }
            } else {
                alert("Order failed: " + result.message);
                btn.disabled = false;
                btn.textContent = "Complete Purchase";
            }
        } catch (error) {
            console.error("Error completing order:", error);
            alert("An error occurred. Please try again.");
            btn.disabled = false;
        }
    };
}

InitCheckout();
