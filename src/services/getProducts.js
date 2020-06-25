import apiCall from './apiCall.js';


class getProducts {
    state={
        elements: []
    }

    setElem(elemList){
        this.state.elements = elemList;
    }

    async getProductsObj(id){
        if(this.state.elements.length > 0){
            console.log(this.state.elements.length);
            return this.state.elements;
        }else{
            let elements = await apiCall.get(`/products/${id}`);
            this.setElem(elements.data);
            return this.state.elements;
        }
    }

}

export default new getProducts;