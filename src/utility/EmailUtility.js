import nodemailer from 'nodemailer';
import {EMAIL_USER, EMAIL_PORT, PASSWORD, SERVICES} from "../config/Config.js";



export const EmailSend = (EmailTO,EmailText,EmailSubject)=>{
    const transport = nodemailer.createTransport({
        service:SERVICES,
        port:EMAIL_PORT,
        secure:true,
        auth:{
            user:EMAIL_USER,
            pass:PASSWORD
        }
    })
    const MailOption = {
        from:EMAIL_USER,
        to:EmailTO,
        subject:EmailSubject,
        text: EmailText
    }
    try{
    let result = transport.sendMail(MailOption);
    return {status:"success",message:"Email sent successfully",result:result};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}










