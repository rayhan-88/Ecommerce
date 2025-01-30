import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/utility.js";


const CartStore = create((set)=>({
    isCartSubmit:false,
    CartForm:{productID:"",color:"",size:""},
    CartFormOnChange: (name,value)=>{
        set((state)=>({
            CartForm:{
                ...state.CartForm,
                [name]:value
            }
        }))
    },
    CartFormRequest:async (postBody,productID,quantity)=>{
        try {
            postBody.productID = productID;
            postBody.qty  = quantity;
            set({isCartSubmit:true})
            const res=await axios.post(`/api/CreateCart`,postBody)
            set({isCartSubmit:false})
            return res.data['status'] === 'success';
        }catch(e){
            unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false})
        }
    },
    CartList:null,
    CartCount:0,
    CartListRequest:async ()=>{

        let res=await axios.get(`/api/CartList`)
        set({CartList:res.data['data']})
        set({CartCount:res.data['data'].length})

    }


}))

export default CartStore;