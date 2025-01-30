import {EmailSend} from "../utility/EmailUtility.js";
import UserModel from "../model/UserModel.js";
import { EncodeToken} from "../utility/TokenUtility.js";
import ProfileModel from "../model/ProfileModel.js";


export const UserOtpServices = async (req)=>{
    try {
        const email = req.params.email;
        const code = Math.floor(1000+Math.random()*9000);

        const EmailSub = 'Send Email Verification Code';
        const EmailText = `Your Email Verification Code is" ${code}"`;
        await EmailSend(email,EmailText,EmailSub);
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});
        return {status:"success",massage:"Email sent successfully"};
    }
    catch(err){
        return {status:'failed',message:"Email Verification Failed",error:err};
    }

}


export const VerifyLoginServices = async (req)=>{
    try {
        const email = req.params.email;
        const otp = req.params.otp;

        let total=await UserModel.find({email:email,otp:otp}).countDocuments();


        if(total===1){

            // User ID Read
            let user_id=await UserModel.find({email:email,otp:otp}).select('_id');

            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            // OTP Code Update To 0
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})

            return {status:"success", message:"Valid OTP",token:token,total:total}

        }
        else{
            return {status:"fail", message:"Invalid OTP",total:total}
        }
    }
    catch(err){
        return {status:'failed',message:"Email Verification Failed",error:err.toString()};
    }
}



export const CreateProfileService = async (req)=>{

    try {
        let user_id = req.headers.user_id;
        let reqBody= req.body;
        reqBody.userID = user_id;
        await ProfileModel.create(reqBody);
        return {status:"success",message:"Profile saved successfully"};
    }
    catch(err){
        return {status:'failed',message:"CreateProfile failed",error:err.toString()};
    }
}



export const UpdateProfileService = async (req)=>{

    try {
        let user_id = req.headers.user_id;
        let reqBody= req.body;
        reqBody.userID = user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
        return {status:"success",message:"Profile Update successfully"};
    }
    catch(err){
        return {status:'failed',message:"UpdateProfile failed",error:err.toString()};
    }
}



export const ReadProfileService = async (req)=>{

    try {
        let user_id = req.headers.user_id;


        let data = await ProfileModel.find({userID:user_id});
        return {status:"success",message:data};
    }
    catch(err){
        return {status:'failed',message:"UpdateProfile failed",error:err.toString()};
    }
}









