import React from 'react';
import UserFormSubmit from "./UserFormSubmit.jsx";
import {useNavigate} from "react-router-dom";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";

const OtpForm = () => {
    const navigate = useNavigate();
    const {FormDataOnChange,FormData,VerifyLoginRequest} = UserStore();
    const onSubmit =async () => {
        if (ValidationHelper.IsEmpty(FormData.otp)){
            toast.error('Please enter a valid Otp');
        }else {
            const res = await VerifyLoginRequest(FormData.otp)
            toast.success('Login successfully');
            res?navigate('/'):toast.error('Something went wrong');
        }

    }
    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Verification Code</h4>
                        <p>A verification code has been sent to the email address you provide</p>
                        <input onChange={(e)=>{FormDataOnChange('otp',e.target.value)}} placeholder="Verification" type="text" className="form-control"/>
                        <UserFormSubmit onClick={onSubmit} className="btn mt-3 btn-success" text="Submit"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;