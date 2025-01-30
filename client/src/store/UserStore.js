import {create} from "zustand";
import axios from "axios";
import {getEmail, setEmail} from "../utility/utility.js";
import Cookies from "js-cookie";

const UserStore = create((set)=>({
    FormData:{},
    FormDataOnChange:(name,value)=>{
        set((state)=>({
            FormData:{
                ...state.FormData,
                [name]:value
            }
        }))
    },


    isFormSubmit:false,


    UserOtpRequest:async (email)=>{
        set({isFormSubmit:true});
        const res =await axios.get(`/api/UserOTP/${email}`);
        setEmail(email);
        set({isFormSubmit:false});
        return res.data['status'] === 'success';
    },
    VerifyLoginRequest:async (otp)=>{
        set({isFormSubmit:true});
        const email = getEmail()
        const res =await axios.get(`/api/VerifyLogin/${email}/${otp}`);
        set({isFormSubmit:false});
        return res.data['status'] === 'success';
    },

    isLogin:()=>{
      return !!Cookies.get('token');
    },
    UserLogoutRequest:async ()=>{
        set({isFormSubmit:true});
        const res =await axios.get(`/api/Logout`);
        set({isFormSubmit:false});
        return res.data['status'] === 'success';
    },
    ProfileFormData:{
        cus_add:"",
        cus_city:"",
        cus_country:"",
        cus_fax:"",
        cus_name:"",
        cus_phone:"",
        cus_postcode:"",
        cus_state:"",
        ship_add:"",
        ship_city:"",
        ship_country:"",
        ship_name:"",
        ship_phone:"",
        ship_postcode:"",
        ship_state:"",
    },
    ProfileFormDataOnChange:(name,value)=>{
        set((state)=>({
            ProfileFormData:{
                ...state.ProfileFormData,
                [name]:value
            }
        }))
    },
    ProfileCreateRequest:async (postBody)=>{
        set({ProfileFormData:null})
        const res =await axios.post(`/api/CreateProfile`,postBody);
        return  res.data['status']='success'
    },
    ProfileUpdateRequest:async (postBody)=>{
        set({ProfileFormData:null})
        const res =await axios.post(`/api/UpdateProfile`,postBody);
        return  res.data['status']='success'
    },
    ProfileReadRequest:async ()=>{
        set({ProfileFormData:null})
        const res =await axios.get(`/api/ReadProfile`);
        return  res.data['status']='success'
    },











}))

export default UserStore;