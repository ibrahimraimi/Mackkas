const Detail_Container = document.getElementById("productDetailContainer");
const Related_Grid = document.getElementById("relatedProductsGrid");

let Current_Product = null;

async function Init() {
    await FetchProduct();
    await FetchRelated();
    SetupEventListeners();
}

async function FetchProduct() {
    try {
        const response = await fetch(`/api/products/${CURRENT_PRODUCT_ID}`);
        Current_Product = await response.json();
        RenderProductDetail(Current_Product);
    } catch (error) {
        console.error("Error fetching product:", error);
        Detail_Container.innerHTML = `<div class="text-center" style="padding: 100px 0;">Product not found.</div>`;
    }
}

async function FetchRelated() {
    try {
        const response = await fetch(`/api/products/${CURRENT_PRODUCT_ID}/related`);
        const related = await response.json();
        RenderRelated(related);
    } catch (error) {
        console.error("Error fetching related products:", error);
    }
}

function SetupEventListeners() {
    // Other listeners if any
}

function RenderProductDetail(product) {
    Detail_Container.innerHTML = `
        <div class="product-detail">
            <div class="product-detail__gallery">
                <img src="${product.img1}" alt="${product.name}" class="product-detail__img">
                ${product.img2 ? `<img src="${product.img2}" alt="${product.name} alternate" class="product-detail__img">` : ''}
            </div>
            <div class="product-detail__info">
                <span class="product-detail__category">${product.category} / ${product.cloth}</span>
                <h1 class="product-detail__title">${product.name}</h1>
                <p class="product-detail__price">${product.price}</p>
                
                <div class="product-detail__desc">
                    ${product.desc || 'Timeless piece crafted with precision and attention to detail. This garment represents the peak of minimalist luxury, designed to be a versatile staple in your wardrobe.'}
                </div>

                <div class="product-detail__actions">
                    <button class="button button--primary w-full" onclick="AddToCart(${product.id})">Add to Bag</button>
                    <button class="button button--outline w-full" onclick="ExpressCheckout(${product.id})">Express Checkout</button>
                </div>

                <div class="product-detail__meta">
                    <div class="meta-item">
                        <span class="meta-item__label">Shipping</span>
                        <span>Complimentary Standard</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-item__label">Returns</span>
                        <span>30-Day Policy</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-item__label">Composition</span>
                        <span>Fine Wool & Silk Blend</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function RenderRelated(products) {
    Related_Grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="window.location.href='/product/${product.id}'" style="cursor: pointer;">
            <div class="product-card__image-wrapper">
                <img src="${product.img1}" alt="${product.name}" class="product-card__image">
            </div>
            <div class="product-card__details">
                <p class="product-card__category">${product.category}</p>
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__price">${product.price}</p>
            </div>
        </div>
    `).join("");
}

// Global Cart Interactions
async function AddToCart(id) {
    const existingItem = Cart_Items.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        Cart_Items.push({ ...Current_Product, qty: 1 });
    }

    UpdateCartUI();
    await SyncCart();
    
    // Open drawer
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
        drawer.classList.remove("close_cart");
        overlay.classList.remove("cart_blocker_hide");
        document.body.style.overflow = "hidden";
    }
}

async function ExpressCheckout(id) {
    const existingItem = Cart_Items.find(item => item.id === id);
    if (!existingItem) {
        Cart_Items.push({ ...Current_Product, qty: 1 });
    } else {
        existingItem.qty++;
    }
    
    UpdateCartUI();
    await SyncCart();
    window.location.href = '/checkout';
}

Init();
