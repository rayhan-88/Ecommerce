import UserStore from "../../store/UserStore.js";
import UserFormSubmit from "./UserFormSubmit.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const LoginForm = () => {
    const navigate = useNavigate();
    const {FormDataOnChange,FormData,UserOtpRequest} = UserStore();
    const onSubmit =async () => {
        if (!ValidationHelper.IsEmail(FormData.email)){
            toast.error('Please enter a valid email');
        }else {
            const res = await UserOtpRequest(FormData.email)
            toast.success('otp send successfully');
            res?navigate('/otp'):toast.error('Something went wrong');
        }

    }

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input onChange={(e)=>{FormDataOnChange('email',e.target.value)}} placeholder="Email Address" type="email" className="form-control"/>
                        <UserFormSubmit onClick={onSubmit} className="btn mt-3 btn-success" text="Next"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;