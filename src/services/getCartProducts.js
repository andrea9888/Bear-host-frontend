import apiCall from './apiCall.js';




class getCartProducts {
    state={
        cart: [],
        force: false
    }

    setCart(cart){
        this.state.cart = cart;
    }

    setForce(bool){
        this.state.force = bool;
    }

    async getCartProductsObj(){
        if(this.state.cart.length > 0 && this.state.force){
            return this.state.cart;
        }else{
            try{
                const cart = await apiCall.get(`/cart`);
                this.setCart(cart.data.carts);
            }catch (error) {
                //pass
            }
            this.setForce(true);
            return this.state.cart;
        }
    }

}

export default new getCartProducts();