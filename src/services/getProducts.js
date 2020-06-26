import React from "react";
import apiCall from './apiCall.js';


class getProducts {
    state={
        elements: {
            "1": [],
            "2": [],
            "3": [],
            "4": []
        }
    }

    setElem(elemList, id){
        this.state.elements[id] = elemList;
    }

    async getProductsObj(id){
        if(this.state.elements[id].length > 0){
            return this.state.elements[id];
        }else{
            let elements = await apiCall.get(`/products/${id}`);
            this.setElem(elements.data, id);
            return this.state.elements[id];
        }
    }

}

export default new getProducts;