import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
    }
    updateCart=(product,method="add")=>{
    var qty=1;
    if(this.state.cart.items.length>0)
    {
     var object=this.state.cart.items.filter(e => {
         return (e.item === product.name) ;
     });
     console.log("object",object);
      if(object.length>0){
          qty=object[0].quantity;
      }
    }console.log("Adding");
      console.log(this.state.cart.items);
      
      if (this.state.cart.items.filter(e => e.item === product.name).length > 0) {
          console.log(method);
      if (method==="add"){
        qty=qty+1;
        console.log("add qty",qty);
      }
      else{
        console.log("remove qty",qty);
        qty=qty-1;
      }
    }

      //console.log(product);
      const productToCart={
        item:product.name,
        quantity:qty
      }
      console.log(productToCart);
      if(productToCart.quantity===1 && method==="add"){
      //console.log(productToCart)
    //   this.setState(prevState => ({
    //     cart:
    //         {items: [
    //         ...prevState.cart.items,
    //         productToCart
    //         ]
    //     },
        let stateCopy=Object.assign({}, this.state);
       stateCopy.cart.items.push(productToCart);
        //})
        let pos = stateCopy.products.map(function(e) { return e.name; }).indexOf(product.name);

        stateCopy.products[pos].cartQuantity=productToCart.quantity;
        this.setState(stateCopy);
    //}))
      }
      else if(productToCart.quantity===0){
        let stateCopy=Object.assign({}, this.state);
        let itemList=stateCopy.cart.items.filter((item)=>{
            if(item.item!==product.name){
                return item
            }
        })
        let pos = stateCopy.products.map(function(e) { return e.name; }).indexOf(product.name);
    
        stateCopy.products[pos].cartQuantity=0;
        
        stateCopy.cart.items=itemList;
        this.setState(stateCopy);
    }
    else{
        let stateCopy = Object.assign({}, this.state);
        stateCopy.cart.items.map((item)=>{
            if(item.item===product.name){
                item.quantity=productToCart.quantity;
            }
        });
        let pos = stateCopy.products.map(function(e) { return e.name; }).indexOf(product.name);
        
        stateCopy.products[pos].cartQuantity=productToCart.quantity;
        console.log("stateCopy",stateCopy);
        this.setState(stateCopy);
    }
}
    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} updateCart={this.updateCart} cart={this.state.cart}/>
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
