import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/utility.js";


const CartStore = create((set)=>({
    isWishSubmit:false,
    WishFormRequest:async (productID)=>{
        try {

            set({isWishSubmit:true})
            const res=await axios.post(`/api/SaveWishList`,{productID:productID})
            return res.data['status'] === 'success';
        }catch(e){
            unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },
    WishList:null,
    WishCount:0,
    WishListRequest:async ()=>{

        let res=await axios.get(`/api/WishList`)
        set({WishList:res.data['data']})
        set({WishCount:res.data['data'].length})

    }


}))

export default CartStore;