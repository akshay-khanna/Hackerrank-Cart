import React, {Component} from "react";
import "./index.css";

export default class ProductList extends Component {
    constructor() {
        super();

    }
     addtoCart(product,e){
         return this.props.updateCart(product);

       //e.preventDefault();
      
       //console.log(e.target);
       //console.log(product.id);
     }
     upQty(product,e){
         console.log(product);
        return this.props.updateCart(product,"add");
         
     }
     downQty(product,e){
        return this.props.updateCart(product,"remove");
     }
    shouldDisable=(product)=>{
        //console.log(this.props.cart.items);
        if(this.props.cart.items.filter(e => e.item === product.name).length === 0){
            //console.log("Disable button")
            return true;
        }
        else
        {
            return false;
        }
    }
    getCartQty=(product)=>{
        console.log(product);
    }
    render() {
        return (
            <div className="layout-row wrap justify-content-center flex-70 app-product-list">
                {this.props.products.map((product, i) => {
                    return (
                        <section className="w-30"
                                 data-testid={'product-item-' + i}
                                 key={product.id}>
                            <div className="card ma-16">
                                <img alt="Your Cart" src={product.image}
                                     className="d-inline-block align-top product-image"/>
                                <div className="card-text pa-4">
                                    <h5 className="ma-0 text-center">{product.name}</h5>
                                    <p className="ma-0 mt-8 text-center">${product.price}</p>
                                </div>
                                <div className="card-actions justify-content-center pa-4">

                                    <button className="x-small outlined" data-testid="btn-item-add"  onClick={e => this.addtoCart(product, e)}>
                                        Add To Cart
                                    </button>

                                    <div className="layout-row justify-content-between align-items-center">
                                        <button className="x-small icon-only outlined"
                                                disabled={this.shouldDisable(product)}
                                                data-testid="btn-quantity-subtract" onClick={e => this.downQty(product, e)}>
                                            <i className="material-icons">remove</i>
                                        </button>
                                        <input type="number"
                                               disabled
                                               className="cart-quantity" data-testid="cart-quantity" value={product.cartQuantity} />

                                        <button className="x-small icon-only outlined"
                                                disabled={this.shouldDisable(product)}
                                                data-testid="btn-quantity-add" onClick={e => this.upQty(product, e)}>
                                            <i className="material-icons">add</i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </section>
                    )
                })}

            </div>

        );
    }
}

export const UpdateMode = {
    ADD: 1,
    SUBTRACT: 0
}
