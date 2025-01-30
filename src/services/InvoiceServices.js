import mongoose from "mongoose";
import CartModel from "../model/CartModel.js";
const objectId = mongoose.Types.ObjectId;
import FormData from "form-data";
import axios from "axios";
import profileModel from "../model/ProfileModel.js";
import InvoiceModel from "../model/InvoiceModel.js";
import InvoiceProductModel from "../model/InvoiceProduct.js";
import PaymentSettingModel from "../model/PaymentSettingModel.js";

export const CreateInvoiceService = async (req)=>{
    try{
        const user_id = new objectId(req.headers.user_id)
        const cus_email = req.headers.email;

        // =============Step 01: Calculate Total Payable & Vat===========================================================

        let matchStage={$match:{userID:user_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindStage={$unwind:"$product"}
        let CartProducts=await CartModel.aggregate([matchStage,JoinStageProduct,unwindStage])

        let totalAmount=0;
        CartProducts.forEach((element)=>{
            let price;
            if(element['product']['discount']){
                price=parseFloat(element['product']['discountPrice'])

            }else {
                price=parseFloat(element['product']['price'])

            }
            totalAmount +=parseFloat(element['qty'])*price;
        })

        let vat =totalAmount* 5.0
        let payable = totalAmount+vat


// =============Step 02: Prepare  Customer Details & Shipping Details========
        let profile = await profileModel.aggregate([matchStage])
        let cus_details = `Name: ${profile[0]['cus_name']},Email: ${cus_email},Address:${profile[0]['cus_add']},Phone : ${profile[0]['cus_phone']}`;
        let ship_details = `Name: ${profile[0]['ship_name']},City: ${profile[0]['ship_city']},Phone: ${profile[0]['ship_phone']},Address:${profile[0]['ship_add']}`;

// =============Step 03: Transaction & Other's ID==========================

        let tran_id=Math.floor(10000000+Math.random()*90000000);
        let val_id=0;
        let delivery_status="pending"
        let payment_status="pending"
// =============Step 04: Create Invoice====================================
        let createInvoice=await InvoiceModel.create({
            userID:user_id,
            payable:payable,
            cus_details:cus_details,
            ship_details:ship_details,
            tran_id:tran_id,
            val_id:val_id,
            payment_status:payment_status,
            delivery_status:delivery_status,
            total:totalAmount,
            vat:vat,
        })

// =============Step 05: Create Invoice Product========================================

        let invoice_id = createInvoice['_id']
        CartProducts.forEach(async (element)=>{
            await InvoiceProductModel.create({
                userID:user_id,
                productID:element['productID'],
                invoiceID:invoice_id,
                qty:element['qty'],
                price:element['product']['discount']?element['product']['discountPrice']:element['product']['price'],
                color:element['color'],
                size:element['size']
            })
        })

//=============Step 06: Remove Carts=====================================================================================
        await  CartModel.deleteMany({userID:user_id});

//=============Step 07: Prepare SSL Payment====================================================================================

        let PaymentSettings=await PaymentSettingModel.find();

        const form =new FormData()
        form.append('store_id',PaymentSettings[0]['store_id'])
        form.append('store_passwd',PaymentSettings[0]['store_passwd'])
        form.append('total_amount',payable.toString())
        form.append('currency',PaymentSettings[0]['currency'])
        form.append('tran_id',tran_id)

        form.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_id}`)
        form.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_id}`)
        form.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_id}`)
        form.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_id}`)

        form.append('cus_name',profile[0]['cus_name'])
        form.append('cus_email',cus_email)
        form.append('cus_add1',profile[0]['cus_add'])
        form.append('cus_add2',profile[0]['cus_add'])
        form.append('cus_city',profile[0]['cus_city'])
        form.append('cus_state',profile[0]['cus_state'])
        form.append('cus_postcode',profile[0]['cus_postcode'])
        form.append('cus_country',profile[0]['cus_country'])
        form.append('cus_phone',profile[0]['cus_phone'])
        form.append('cus_fax',profile[0]['cus_phone'])

        form.append('shipping_method',"YES")
        form.append('ship_name',profile[0]['ship_name'])
        form.append('ship_add1',profile[0]['ship_add'])
        form.append('ship_add2',profile[0]['ship_add'])
        form.append('ship_city',profile[0]['ship_city'])
        form.append('ship_state',profile[0]['ship_state'])
        form.append('ship_country',profile[0]['ship_country'])
        form.append('ship_postcode',profile[0]['ship_postcode'])

        form.append('product_name','According Invoice')
        form.append('product_category','According Invoice')
        form.append('product_profile','According Invoice')
        form.append('product_amount','According Invoice')

        let SSLRes=await axios.post(PaymentSettings[0]['init_url'],form);


        return {status : "success",data:SSLRes.data};
    }
    catch(err){
        return {status:"error",message:"Invoice Error",error:err.toString()};
    }
}



export const PaymentSuccessService = async (req)=>{
    try{

        let trxID=req.params.trxID;
        let data = await  InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"});
        return {status:"success",data:data}
    }
    catch(err){
        return {status:"error",message:"Invoice Error",error:err.toString()};
    }
}

export const PaymentFailService = async (req)=>{
    try{

        let trxID=req.params.trxID;
        await  InvoiceModel.updateOne({tran_id:trxID},{payment_status:"fail"});
        return {status:"fail"}
    }
    catch(err){
        return {status:"error",message:"Invoice Error",error:err.toString()};
    }
}

export const PaymentCancelService = async (req)=>{
    try{

        let trxID=req.params.trxID;
        await  InvoiceModel.updateOne({tran_id:trxID},{payment_status:"cancel"});
        return {status:"cancel"}
    }
    catch(err){
        return {status:"error",message:"Invoice Error",error:err.toString()};
    }
}


export const PaymentIPNService = async (req)=>{
    try{

        let trxID=req.params.trxID;
        let status=req.body['status'];
        await  InvoiceModel.updateOne({tran_id:trxID},{payment_status:status});
        return {status:"success"}
    }
    catch(err){
        return {status:"error",message:"Invoice Error",error:err.toString()};
    }
}


export const InvoiceListService = async (req)=>{
    try{

        let user_id=req.headers.user_id;
        let invoice=await InvoiceModel.find({userID:user_id});
        return {status:"success",data: invoice}
    }
    catch(err){
        return {status:"error",message:"Invoice Error",error:err.toString()};
    }
}


export const InvoiceProductListService = async (req)=>{
    try{

        let user_id=new objectId(req.headers.user_id);
        let invoice_id=new objectId(req.params.invoice_id);

        let matchStage={$match:{userID:user_id,invoiceID:invoice_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindStage={$unwind:"$product"}

        let products=await InvoiceProductModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindStage
        ])


        return {status:"success",data: products}
    }
    catch(err){
        return {status:"error",message:"Invoice Error",error:err.toString()};
    }
}


















