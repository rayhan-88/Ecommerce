import {
    CreateProfileService, ReadProfileService,
    UpdateProfileService,
    UserOtpServices,
    VerifyLoginServices
} from "../services/UserServices.js";


export const UserOTP = async (req,res)=>{
    let result = await UserOtpServices(req);
    return res.json(result);
}

export const VerifyLogin = async (req,res)=>{
    let result = await VerifyLoginServices(req);
    if(result["status"] === "success"){
        let cookie = {expires:new Date(Date.now()+24*60*60*1000),httpOnly:false};
        res.cookie("token",result['token'],cookie);

        return res.json(result);
    }else {
        return res.json(result);
    }

}

export const Logout = async (req,res)=>{
        try {
            let cookie = {expires:new Date(Date.now()-24*60*60*1000),httpOnly:false};
            res.cookie("token","",cookie);
            return res.json({status:"Logout success"});
        }
        catch(error){
            return {status:"fail", message: error.toString()};
        }
}


export const CreateProfile = async (req,res)=>{
    let result = await CreateProfileService(req);
    res.json(result)
}


export const UpdateProfile = async (req,res)=>{
    let result = await UpdateProfileService(req);
    res.json(result)
}

export const ReadProfile = async (req,res)=>{
    let result = await ReadProfileService(req);
    res.json(result)
}







