import {create} from 'zustand'
import axios from "axios";



const ProductStore = create((set)=>({
    SliderList:null,
        SliderListRequest:async ()=>{
        let res = await axios.get('/api/SliderList')
            if(res.data['status'] === 'success'){
                set({SliderList:res.data['data']})
            }
    },
    CategoryList:null,
    CategoryListRequest:async ()=>{
        let res = await axios.get('/api/CategoryList')
        if (res.data['status']==='success'){
            set({CategoryList:res.data['data']})
        }
    },
    BrandList:null,
    BrandListRequest:async ()=>{
        let res = await axios.get('/api/BrandList')
        if (res.data['status']==='success'){
            set({BrandList:res.data['data']})
        }
    },

    ListRemark:null,
    ListRemarkRequest:async (Remark)=>{
        let res = await axios.get(`/api/ProductListByRemark/${Remark}`)
        set({ListRemark:null})
        if (res.data['status']==='success'){
            set({ListRemark:res.data['data']})
        }
    },
    ListProduct:null,
    ListByBrandRequest:async (id)=>{
        let res = await axios.get(`/api/ProductListByBrand/${id}`)
        set({ListProduct:null})
        if (res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },

    ListByCategoryRequest:async (id)=>{
        let res = await axios.get(`/api/ProductListByCategory/${id}`)
        set({ListProduct:null})
        if (res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },
    ListByKeywordRequest:async (keyword)=>{
        let res = await axios.get(`/api/ProductListByKeyword/${keyword}`)
        set({ListProduct:null})
        if (res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },
    ListByFilterRequest:async (postBody)=>{
        let res = await axios.post(`/api/ProductListByFilter`,postBody)
        set({ListProduct:null})
        if (res.data['status']==='success'){
            set({ListProduct:res.data['data']})
        }
    },
    SearchKeyword:"",
    SetSearchKeyword:async (keyword)=>{
        set({SearchKeyword:keyword})
    },
    Details:null,
    ProductDetailsRequest:async (id)=>{
        set({ProductDetails:null})
        let res = await axios.get(`/api/ProductDetails/${id}`)
        if(res.data['status']==='success'){
            set({Details:res.data['data']})
        }
    },
    Review:null,
    ProductReviewRequest:async (id)=>{
        set({ProductReviewList:null})
        let res = await axios.get(`/api/ProductListByReview/${id}`)
        if(res.data['status']==='success'){
            set({Review:res.data['data']})
        }
    }



}))
export default ProductStore;