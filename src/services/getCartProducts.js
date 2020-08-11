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



    getCartProductsObj = async () => {
        if(this.state.force){
            return this.state.cart;
        }else{
            console.log("getCartProducts")
            try{
                const cart = await apiCall.get(`/cart`);
                if(cart.status === 200) this.setCart(cart.data.carts);
            }catch (error) {
                //pass
            }
            this.setForce(true);
            return this.state.cart;
        }
    }

    cartLen = async () => {
        if(!this.state.force){
            try{
                const cart = await apiCall.get(`/cart`);
                if(cart.status === 200) this.setCart(cart.data.carts);
            }catch (error) {
                //pass
            }
            this.setForce(true);
        }
        console.log(this.state.cart)
        return this.state.cart.length;
    }


}

export default new getCartProducts();