import {CartListService, CreateCartService, RemoveCartService, UpdateCartService} from "../services/CartService.js";

export const CreateCart=async (req,res)=>{
    let result = await CreateCartService(req)
    res.json(result)
}

export const UpdateCart=async (req,res)=>{
    let result = await UpdateCartService(req)
    res.json(result)
}

export const RemoveCart=async (req,res)=>{
    let result = await RemoveCartService(req)
    res.json(result)
}

export const CartList=async (req,res)=>{
    let result = await CartListService(req)
    return res.json(result)
}






