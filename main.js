
import { products } from "./products.js";


const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart =document.querySelector("#close-cart");
const trash=document.querySelector(".remove-cart");
const total =document.querySelector(".totalprice");


const clearCart = document.querySelector(".btn-buy");
const totalCart =document.querySelector(".totla");
const cartContent=document.querySelector(".shop-content");
const Content=document.querySelector(".cart-content");
const box=document.querySelector(".cart-box");


// show and close modal cart

cartIcon.onclick = () =>{
    cart.classList.add("active")
}
closeCart.onclick = () =>{
    cart.classList.remove("active")
}


// get products

class Product{
 static getproduct(){
    return products;
 }
}

let input = [];
// display product

class Ui {
    
    displayProducts(products){
    let result ="";
products.forEach((item) =>{
result+=`
 <div class="product-box">
<img src=${item.img} alt="#" class="product-img">
<h2 class="product-title">${item.title}</h2>
<span class="price">${item.price}</span>
<i class="fa-solid fa-bag-shopping" id="add-cart" data-id=${item.id} ></i>
</div>
`
cartContent.innerHTML=result;
})
}

getAddToCartBtns(){
    const addCartBtn =document.querySelectorAll("#add-cart");
  const buttons =[...addCartBtn];

  
  buttons.forEach((btn)=>{
      const id =btn.dataset.id;

      const isInCart=input.find((p) => p.id ===id);
      if(isInCart){
        btn.style.background = "green";
        btn.disabled=true;
      }



      btn.addEventListener("click",(event)=>{
        event.target.style.background ="green";
        event.target.disabled=true;

        // get product from local
       const addedProduct= {...Store.getProductStorage(id),quantity:1};

    //    add to cart

    input=[...input,addedProduct];

    Store.saveCart(input);



    this.addCartItem(addedProduct);


      })
  });
}

addCartItem(cartItem){

    const div =document.createElement("div");
   
    div.innerHTML=`
    <div class="cart-box">
        <img src=${cartItem.img} alt="" class="cart-img">


        <div class="detail-box">
            <div class="cart-product-title">
             ${cartItem.title}
            </div>


            <div class="cart-price">${cartItem.price}</div>
           
            </div>
            
            
            </div>
            <i class="fa-solid fa-trash-alt" class="cart-remove"
            data-id=${cartItem.id}
            ></i>
    
    `
Content.appendChild(div);
}
setupApp(){

    // get cart from storage
 input=Store.getCart();

    // addcartitem
input.forEach((cartItem) => this.addCartItem(cartItem))
    // set values
}

cartLogic(){
  clearCart.addEventListener("click",() =>{
    
    input.forEach((cItem) => this.removeItem(cItem.id));

    while(cartContent.children.length){
        Content.removeChild(Content.children[0]);
    }
  });

Content.addEventListener("click" , (event)=>{
// console.log(event.target.classList)

    if(event.target.classList.contains("fa-solid")){
        const removeItem =event.target;
const removedItem =input.find((c) => c.id == removeItem.dataset.id);

this.removeItem(removedItem.id);
Store.saveCart(input);
Content.removeChild(removeItem.parentElement);

    }else{
        return [];
    }
})
}


removeItem(id){
   input = input.filter((cItem) => cItem.id !== id);


   Store.saveCart(input);

}
}

// handle storage
class Store{
static saveProducts(){
localStorage.setItem("products",JSON.stringify(products));
}

static getProductStorage (id){
    const _products =JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id ===id);
}
static saveCart(cart){
    localStorage.setItem("cart" , JSON.stringify(cart))
}

static getCart (){
return JSON.parse(localStorage.getItem("cart")) ?
JSON.parse(localStorage.getItem("cart")) :[];
  
}
}

// show product in DOM
document.addEventListener("DOMContentLoaded",() =>{
    const get = new Product();
    const productData= Product.getproduct();
    const ui =new Ui();
    ui.setupApp();
    ui.cartLogic();
    ui.displayProducts(productData);
    ui.getAddToCartBtns();
    Store.saveProducts(productData);
})

