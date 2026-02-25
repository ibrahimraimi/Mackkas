let Product_Container = document.querySelector(".product");
let Product_Item = document.querySelector(".item");
let Cart = document.querySelector(".close_cart");
let Close_Cart = document.getElementById("close");
let Open_Cart = document.querySelector(".cart_icon");
let Cart_Items = [];
let List_Cart = document.querySelector(".list_cart");
let List_Number= document.querySelector(".number");
let Plus = document.querySelector(".plus");
let Minus = document.querySelector(".minus");
let total = 0;
let Overall = document.querySelector(".total")
let Purchase = document.querySelector(".success_hide")
let Pending = document.querySelector(".pending_hide")
const Slide_value = document.querySelector(".slide-value");
const Slider = document.getElementById("range");
let Item_Search = document.querySelector(".search_input")
let Button_Icon = document.querySelector(".btn_icon")
var filterButtons = document.querySelectorAll('.filter-btn');
let not_in_cart = document.querySelector(".not-in-cart");
let category_Button = document.getElementById("categoryBtn")
let Category_Menu = document.querySelector(".category")
let category_opacity = document.querySelector(".category_blocker_hide")
let cart_opacity = document.querySelector(".cart_blocker_hide")
let Close_cart2 = document.querySelector(".cart_blocker")
let None_In_Cart = document.querySelector(".nothing-in-cart_hide")

// Get logged-in user
let CurrentUser = sessionStorage.getItem("currentUser");

if(CurrentUser){
  let ParsedUser = JSON.parse(CurrentUser);
  let NameDisplay = document.querySelector(".name_user");
  NameDisplay.textContent = ParsedUser.Name;
}


let Items = [
    {   
        All: "all",
        category: "men",
        cloth:"suit",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Suit1.avif",
        img2: "images/Suit1(2).jpg",
        name: "Black Suit",
        desc : "20% offer",
        Price: 50,
        price : "$50",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "women",
        cloth: "bag",
        id : "prod-" + Math.random()*1000,
        img1 : "images/HandBag1.jpg",
        img2: "images/HandBag2.jpg",
        name: "Hand Bag",
        desc : "20% offer",
        Price: 600,
        price : "$600",
        buy: "Add to Cart",
        qty: 1
    },
    {
        category: "women",
        cloth: "gown",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Gown1(red).jpg",
        img2: "images/Gown1(white).jpg",
        name: "Slit Cut Gown",
        desc : "30% offer",
        Price: 120,
        price : "$120",
        buy: "Add to Cart",
        qty: 1
    },
    {   
        category: "men",
        cloth:"suit",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Suit4.jpg",
        img2: "images/Suit11.jpg",
        name: "Blue Suit",
        desc : "30% offer",
        Price: 60,
        price : "$60",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "men",
        cloth:"watch",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Watch7(blk).jpg",
        img2: "images/Watch8(blk).jpg",
        name: "Black watch",
        desc : "70% offer",
        Price: 520,
        price : "$520",
        buy: "Add to Cart",
        qty: 1
    },
    {
        category: "women",
        cloth: "gown",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Gown2(Pink).jpg",
        img2: "images/Gown2(darkBlue).jpg",
        name: "Star Light Gown",
        desc : "50% offer",
        Price: 620,
        price : "$620",
        buy: "Add to Cart",
        qty: 1
    },
    {
        category: "men",
        cloth:"suit",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Suit13.jpg",
        img2: "images/Suit13(2).jpeg",
        name: "Brown Suit",
        desc : "30% offer",
        Price: 60,
        price : "$60",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "men",
        cloth:"watch",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Watch1.jpg",
        img2: "images/Watch2(gold).jpg",
        name: "Gold watch",
        desc : "60% offer",
        Price: 420,
        price : "$420",
        buy: "Add to Cart",
        qty: 1
    },
    {
        category: "men",
        cloth:"watch",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Watch3(GB).jpg",
        img2: "images/Watch4(GB).jpg",
        name: "Gold-Black Watch",
        desc : "60% offer",
        Price: 820,
        price : "$820",
        buy: "Add to Cart",
        qty: 1
    },
    {
        category: "men",
        cloth:"suit",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Suit12.jpg",
        img2: "images/Suit9.jpg",
        name: "Brown Suit",
        desc : "30% offer",
        Price: 60,
        price : "$60",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "women",
        cloth: "gown",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Gown4(DarkBrown).jpg",
        img2: "images/Gown4(LightBrown).jpg",
        name: "Brown Gown",
        desc : "30% offer",
        Price: 670,
        price : "$670",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "men",
        cloth:"suit",
        id : "prod-" + Math.random()*1000,
        img1 : "images/BlueSuit.jpeg",
        img2: "images/Blue Suit1.jpg",
        name: "Dark Blue Suit",
        desc : "30% offer",
        Price: 60,
        price : "$60",
        buy: "Add to Cart",
        qty: 1
    },

    {   
        category: "men",
        category: "women",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Shoe.jpg",
        img2: "images/Shoe2.jpeg",
        name: "Black Shoe",
        desc : "30% offer",
        Price: 870,
        price : "$870",
        buy: "Add to Cart",
        qty: 1
    },

    {   
        category: "men",
        cloth:"watch",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Watch9(lea).jpg",
        img2: "images/Watch10(lea).jpg",
        name: "Leather Watches",
        desc : "30% offer",
        Price: 1950,
        price : "$1950",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "men",
        cloth:"watch",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Watch5(Dig).jpg",
        img2: "images/Watch6(Dig).jpg",
        name: "Digital Watch",
        desc : "30% offer",
        Price: 60,
        price : "$60",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "women",
        cloth: "gown",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Gown3(green).jpg",
        img2: "images/Gown3(pink).jpg",
        name: "Short Gown",
        desc : "30% offer",
        Price: 60,
        price : "$60",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "women",
        id : "prod-" + Math.random()*1000,
        img1 : "images/PumpkinOutfits.jpg",
        img2: "",
        name: "Pumpkin Outfit",
        desc : "60% offer",
        Price: 750,
        price : "$750",
        buy: "Add to Cart",
        qty: 1
    },

    {   
        category: "women",
        cloth: "gown",
        id : "prod-" + Math.random()*1000,
        img1 : "images/Gown4(PinkB)..jpg",
        img2: "images/Gown4(Pink).webp",
        name: "Pink Gown",
        desc : "30% offer",
        Price: 60,
        price : "$60",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category:"men",
        id : "prod-" + Math.random()*1000,
        img1 : "images/trouser.jpg",
        name: "Dark Trouser",
        desc : "0% offer",
        Price: 30,
        price : "$30",
        buy: "Add to Cart",
        qty: 1
    },

    {
        category: "women",
        cloth: "bag",
        id : "prod-" + Math.random()*1000,
        img1 : "images/MiniBag.jpg",
        img2: "images/MiniBag1.jpg",
        name: "Mini Bag",
        desc : "30% offer",
        Price: 20,
        price : "$20",
        buy: "Add to Cart",
        qty: 1
    },

    








]


let GenerateItems = (Items)=>{
for (let i = 0; i < Items.length; i++) {
    Product_Container.innerHTML += 
`
<div class="item">
<div class="product-images">
  <img src="${Items[i].img1}" alt="">
  <img id="Suit2" src="${Items[i].img2}" alt="">
</div>
<div class="texts">
  <div class="pb">
    <h4 class="product-name">${Items[i].name}</h4>
    <h3 class="product-price">${Items[i].price}</h3>
  </div>
  
  <div class="description">
    <span class="product-description">${Items[i].desc}</span> 
    <div class="star-rating">
      <div class="star-rate-1">
        <input type="radio" name="star${i + 1}" id="star${i + 1}-1" onclick="UpdateStars('${i + 1}', 1)">
        <label for="star${i + 1}-1"><iconify-icon class="star${i + 1}" icon="material-symbols:star"></iconify-icon></label>
      </div>

      <div class="star-rate-2">
        <input type="radio" name="star${i + 1}" id="star${i + 1}-2" onclick="UpdateStars('${i + 1}', 2)">
        <label for="star${i + 1}-2"> <iconify-icon class="star${i + 1}" icon="material-symbols:star" ></iconify-icon></label>
        
      </div>

      <div class="star-rate-3">
        <input type="radio" name="star${i + 1}" id="star${i + 1}-3" onclick="UpdateStars('${i + 1}', 3)">
        <label for="star${i + 1}-3"><iconify-icon class="star${i + 1}" icon="material-symbols:star"></iconify-icon></label>
        
      </div>

      <div class="star-rate-4">
        <input type="radio" name="star${i + 1}" id="star${i + 1}-4" onclick="UpdateStars('${i + 1}', 4)">
        <label for="star${i + 1}-4"><iconify-icon class="star${i + 1}" icon="material-symbols:star" ></iconify-icon></label>
        
      </div>

      <div class="star-rate-5">
        <input type="radio" name="star${i + 1}" id="star${i + 1}-5" onclick="UpdateStars('${i + 1}', 5)">
        <label for="star${i + 1}-5"><iconify-icon class="star${i + 1}" icon="material-symbols:star"></iconify-icon> </label>
       
      </div>

      <div class="starr">
      </iconify-icon> <iconify-icon class="sta" icon="material-symbols:star-outline"></iconify-icon>
      </iconify-icon> <iconify-icon class="sta" icon="material-symbols:star-outline"></iconify-icon>
      </iconify-icon> <iconify-icon class="sta" icon="material-symbols:star-outline"></iconify-icon>
      </iconify-icon> <iconify-icon class="sta" icon="material-symbols:star-outline"></iconify-icon>
      </iconify-icon> <iconify-icon class="sta" icon="material-symbols:star-outline"></iconify-icon>

      </div>

    </div>
    </div>
  </div>
  <button id="${Items[i].id}" class="add_to_cart" onclick="AddToCart('${Items[i].id}')">${Items[i].buy}</button>
 </div>

`
}}

GenerateItems(Items);


let theRadio = document.querySelectorAll('.rad-star');




let find_id;
let x = 0;
function AddToCart(id){
   
 find_id = id;
 let Button_id = document.getElementById(`${id}`)

 

 console.log(Cart_Items);
 
 if(Button_id.textContent != "Added To Cart"){
  x++;
  List_Number.innerHTML = x;
  let Find_Item = Items.find((item) => {
    if(item.id === find_id){ 
        Cart_Items.push(item)
    }
  
 })
  Cartitems(Cart_Items);
  }else{
   not_in_cart.className = "already-in-cart"

   setTimeout(() => {
    not_in_cart.className = "not-in-cart"
   },3000)
   return;
  }

  Button_id.textContent = "Added To Cart"
  Button_id.style.backgroundColor = "#5a2823"
  Button_id.style.fontSize = "12px"
 
}

function Cartitems(items){

  List_Cart.innerHTML = 
  items.map((Items, index) => {
    let{
        category,
        cloth,
        id,
        img1,
        img2,
        name,
        desc,
        price,
        Price,
        buy,
        qty,
    }
    = Items
    return `
    <div class="cart_item">
    <div class="cartitem_image"><img src="${img1}" alt=""></div>

    <div class="cartitem_name"><h3>${name}</h3></div>

    <div class="cartitem_price"><p>${price}</p></div>

    <div class="cartitem_quantity">
      <span class="minus" onclick="DecreaseQuantity('${id}', -1)">-</span>
      <span class="digit">${qty}</span>
      <span class="plus" onclick="IncreaseQuantity('${id}', 1)">+</span>
    </div>

    </div>
    `
  }).join("")

  calculateGrandTotal();
  
//   total = Cart_Items.reduce((previous, currentitem) =>previous + currentitem.Price, 0)
 
  
}





Close_Cart.addEventListener("click", (e) =>{
    Cart.className = "close_cart"
    cart_opacity.className = "cart_blocker_hide"
    
})

Open_Cart.addEventListener("click", (e) =>{
    Cart.className = "cart"
    cart_opacity.className = "cart_blocker"
    
})

function Bacon(){
  Cart.className = "close_cart"
  cart_opacity.className = "cart_blocker_hide";
}


function IncreaseQuantity(id, change) {
    let Digit = document.querySelector(".digit");
    let number = 0;
    let item = Cart_Items.find((item) => item.id === id);
    if (item) {
      item.qty += change;   
      total = item.Price * item.qty;
    //   GrandTotal = total
     
      console.log(Cart_Items);
      Cartitems(Cart_Items);
      
      calculateGrandTotal();
    }

    
}

function DecreaseQuantity(id, change) {
    let Digit = document.querySelector(".digit");
    let item = Cart_Items.find((item) => item.id === id);
    let Button_id = document.getElementById(`${id}`)
    if (item) {
      item.qty += change;  
      total = total - item.Price;
    //   GrandTotal -= item.Price 
     if(GrandTotal <= 1)
      {
        GrandTotal = 1;
      }
     
      if (item.qty < 1) {
        x -= 1
        item.qty = 1; 
        Cart_Items = Cart_Items.filter((item) => item.id !== id);
        List_Number.innerHTML = x;
        Button_id.textContent = "Add To Cart"
        Button_id.style.backgroundColor = "#e74c3c"
        Cartitems(Cart_Items)
      }

     
      Cartitems(Cart_Items);
      
      calculateGrandTotal();
    }
}

function calculateGrandTotal() {
    GrandTotal = Cart_Items.reduce((acc, curr) => acc + curr.Price * curr.qty, 0);
    console.log(GrandTotal);
    Overall.innerHTML = `<span style="color: white">Total Price: </span>$${GrandTotal}`
    
}

function Buy(){
  let ATC_Button = document.querySelectorAll(".add_to_cart")
  if(Cart_Items == 0)
  {
    None_In_Cart.className = "nothing-in-cart"

    setTimeout(() => {
      None_In_Cart.className = "nothing-in-cart_hide"
     },2000)
    
  }
  else if(Cart_Items != 0){
    Pending.className = "pending";
    
    setTimeout(() => {
      Pending.className = "pending_hide"
      Purchase.className = "success"
    }, 2000)

    setTimeout(() => {
        Purchase.className = "success_hide"
      }, 4000)
      
      List_Cart.innerHTML = ""

      Cart_Items = []; 

      Overall.innerHTML = `<span style="color: white">Total Price: </span>$0`
      
      x = 0;

      List_Number.innerHTML = 0;

      ATC_Button.forEach((ATC, index) => {
        ATC.style.backgroundColor = "#e74c3c"
        ATC.textContent = "Add to Cart"
      })

      console.log(Cart_Items);
  }

  
}

Slider.oninput = (() => {
  let Value = Slider.value;
  Slide_value.textContent = "$"+Value;
  Slide_value.style.left = (Value/38) + "%"
  Slide_value.classList.add("show")
});

Slider.onblur = (() => {
  Slide_value.classList.remove("show")
})


function Search_Item(){
  let Search = Items.filter(item => {
    Product_Container.innerHTML = "";
    if(item.name.toLowerCase().includes(Item_Search.value.toLowerCase())){
      return item;
    }
  })
  GenerateItems(Search);
}

function Search_Range(){
  let RangeFilter = Items.filter((range) => {
    Product_Container.innerHTML = "";
    if(range.Price <= Slider.value){
      return range;
    }
  })
  GenerateItems(RangeFilter);
}

Item_Search.addEventListener("keyup", (e) => {
  Search_Item();
})

Button_Icon.addEventListener("click", (e) => {
  Search_Item();
})

Slider.addEventListener("mouseup" ,(e) => {
  Search_Range();
})



function filter(selectedFilter) {
  // Get all filter buttons
  var filterButtons = document.querySelectorAll('.filter-btn');

  // Reset color for all filter buttons
  filterButtons.forEach(function (button) {
    button.style.color = ''; // Reset color to the default
    button.style.marginLeft = '';

    button.addEventListener("click", (e) => {
      if(button.textContent == "All"){
        Items = Items.filter(item => item.name !== "")
        Product_Container.innerHTML = "";
          GenerateItems(Items)
      }
  
      else if(button.textContent == "Men"){
        let men = Items.filter(item => item.category === "men")
        Product_Container.innerHTML = "";
          GenerateItems(men)
      }
  
      else if(button.textContent == "Women"){
        let women = Items.filter(item => item.category === "women")
        Product_Container.innerHTML = "";
        GenerateItems(women)
      }

      else if(button.textContent == "Suits"){
        let suit = Items.filter(item => item.cloth === "suit")
        Product_Container.innerHTML = "";
        GenerateItems(suit)
      }

      else if(button.textContent == "Gown"){
        let gown = Items.filter(item => item.cloth === "gown")
        Product_Container.innerHTML = "";
          GenerateItems(gown)
      }

      else if(button.textContent == "Watches")
      {
        let watch = Items.filter(item => item.cloth === "watch")
        Product_Container.innerHTML = "";
          GenerateItems(watch)
      }

      else if(button.textContent == "Bags"){
        let bag = Items.filter(item => item.cloth === "bag")
        Product_Container.innerHTML = "";
          GenerateItems(bag)
      }
    })
    
  });

  // Set color for the selected filter button
  var selectedButton = document.getElementById(selectedFilter + 'Filter');
  selectedButton.style.color = 'blue';
  selectedButton.style.marginLeft = '20px';
  
}


            
 
         
           
for (let i = 1; i <= Items.length; i++) {
    const randomIndex = Math.floor(Math.random() * 5) + 1;

    const Stars = document.querySelectorAll(`.star${i}`)
    
    Stars.forEach((star, index) => {
      if(index >= randomIndex){
        star.style.color = "white"
      }
      else{
        star.style.color = "gold"
      }
  
      
    })
    

}



  let Stat_Rating = document.querySelectorAll(".star-rating")
  let Product_description = document.querySelectorAll(".product-description")
  
 

  setInterval(() =>{
    Stat_Rating.forEach((star) => {  
      setTimeout(() => {
          star.className = "star-rating-transition"
         }, 2000)
       
      })
    
      Product_description.forEach((desc) => {
        setTimeout(() => {
          desc.className = "product-description-transition"
         }, 2000)
      })


      Stat_Rating.forEach((star) => {  
        setTimeout(() => {
            star.className = "star-rating"
           }, 5000)
          
        })
      
        Product_description.forEach((desc) => {
          setTimeout(() => {
            desc.className = "product-description"
           }, 5000)
        })
  
  }, 10000)

  category_Button.addEventListener("click", (e) => {
     Category_Menu.className = "category_bringback"
     category_opacity.className = "category_blocker"
   
  })

 document.addEventListener("click", (e) => {
  let Category_M = document.querySelector(".category_bringback")
  
  if (e.target !== category_Button && !category_Button.contains(e.target) && !Category_M.contains(e.target)){
    Category_M.className = "category"
    category_opacity.className = "category_blocker_hide"
  }



 });
  
 













