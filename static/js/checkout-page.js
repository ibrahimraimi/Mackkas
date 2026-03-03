const Checkout_Form = document.getElementById("checkoutForm");
const Checkout_Items_Container = document.getElementById("checkoutItems");
const Checkout_Subtotal = document.getElementById("checkoutSubtotal");
const Checkout_Total = document.getElementById("checkoutTotal");
const Success_Modal = document.getElementById("successModal");
const Success_Overlay = document.getElementById("successOverlay");
const Order_Id_Span = document.getElementById("orderId");

let Cart_Items = [];

async function InitCheckout() {
    await FetchCart();
    RenderCheckoutSummary();
    SetupForm();
}

async function FetchCart() {
    try {
        const response = await fetch('/api/cart');
        Cart_Items = await response.json();
        
        if (Cart_Items.length === 0) {
            window.location.href = '/mackkas';
        }
    } catch (error) {
        console.error("Error fetching checkout items:", error);
    }
}

function RenderCheckoutSummary() {
    Checkout_Items_Container.innerHTML = Cart_Items.map(item => `
        <div class="checkout-item">
            <img src="${item.img1}" alt="${item.name}" class="checkout-item__img">
            <div class="checkout-item__details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.qty}</p>
            </div>
            <div style="font-size: 14px; font-weight: 500;">
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
