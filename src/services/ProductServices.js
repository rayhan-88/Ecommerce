import mongoose from "mongoose";
import BrandModel from "../model/BrandModel.js";

import CategoryModel from "../model/CategoryModel.js";
import ProductSliderModel from "../model/ProductSliderModel.js";
import ProductModel from "../model/ProductModel.js";
import ReviewModel from "../model/ReviewModel.js";
const ObjectId=mongoose.Types.ObjectId;




export const BrandServices = async () => {
    try {
        let data =await BrandModel.find();
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const CategoryServices = async () => {
    try {
        let data =await CategoryModel.find()
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const SliderServices = async () => {
    try {
        let data =await ProductSliderModel.find()
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const ListByBrandService = async (req) => {

    try {
        let BrandID = new ObjectId(req.params.BrandID)
        let MatchStage = {$match:{brandID:BrandID}}

        let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}

        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'brandID': 0,"categoryID":0}}

        let data = await ProductModel.aggregate(
            [
               MatchStage,
                JoinWithBrandStage,
                JoinWithCategoryStage,
                UnwindBrandStage,
                UnwindCategoryStage,
                ProjectionStage
            ]
        )
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const ListByCategoryService = async (req) => {

    try {
        let CategoryID = new ObjectId(req.params.CategoryID)
        let MatchStage = {$match:{categoryID:CategoryID}}
        let JoinCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let JoinBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let unwindBrandStage = {$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'brandID': 0,"categoryID":0}}
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinBrandStage,
            JoinCategoryStage,
            unwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const ListByRemarkService = async (req) => {

    try {
        let Remark = req.params.Remark;
        let MatchStage = {$match:{remark:Remark}}
        let JoinBrandStage = {$lookup:{from:'brands',localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'brandID': 0,"categoryID":0}}
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinBrandStage,
            JoinCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const ListBySmilierService = async (req)=>{
    try{
        let CategoryID = new ObjectId(req.params.CategoryID)
        let MatchStage = {$match:{categoryID:CategoryID}}
        let LimitStage = {$limit:10}
        let JoinBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinCategoryStage ={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let UnwindBrandStage = {$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'brandID': 0,"categoryID":0}}
        let data = await ProductModel.aggregate([
            MatchStage,
            LimitStage,
            JoinBrandStage,
            JoinCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const DetailsService = async (req)=>{
    try{
        let ProductID = new ObjectId(req.params.ProductID)
        let MatchStage = {$match:{_id:ProductID}}
        let JoinBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let JoinDetails ={$lookup:{from:'productdetails',localField:"_id",foreignField:"productID",as:"details"}}
        let UnwindDetails ={$unwind:"$details"}
        let UnwindCategory ={$unwind:"$category"}
        let UnwindBrand ={$unwind:"$brand"}
        let ProjectionStage = {$project:{'details._id':0,'brand._id':0,'category._id':0,'brandID': 0,"categoryID":0}}



        let data = await ProductModel.aggregate([
            MatchStage,
            JoinBrandStage,
            JoinCategoryStage,
            JoinDetails,
            UnwindBrand,
            UnwindCategory,
            UnwindDetails,
            ProjectionStage
        ])

        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const ListByKeywordService = async (req)=>{
    try{
        let SearchRegex = {$regex:req.params.Keyword,"$options":"i"}
        let SearchParams = [{title:SearchRegex},{remark:SearchRegex}]
        let SearchQuery = {$or:SearchParams};
        let MatchStage = {$match:SearchQuery}
        let JoinBrand = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinCategory ={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let JoinDetails = {$lookup:{from:'productdetails',localField:"_id",foreignField:"productID",as:"details"}}
        let UnwindDetails ={$unwind:"$details"}
        let UnwindCategory ={$unwind:"$category"}
        let UnwindBrand ={$unwind:"$brand"}
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'brandID': 0,"categoryID":0,'details._id':0,'productID':0}}
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinBrand,
            JoinCategory,
            JoinDetails,
            UnwindDetails,
            UnwindCategory,
            UnwindBrand,
            ProjectionStage
        ])

        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}

export const ReviewListService = async (req)=>{
    try{
        let ProductID = new ObjectId(req.params.ProductID)
        let MatchStage = {$match:{productID:ProductID}}
        let JoinWithProfileStage = {$lookup:{from:'profiles',localField:'userID',foreignField:"userID",as:"profile"}}
        let UnwindProfile = {$unwind:"$profile"}
        let ProjectionStage = {$project:{'des': 1, 'rating': 1, 'profile.cus_name': 1}}
        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfile,
            ProjectionStage
        ])
        return {status: 'success', data: data};
    }
    catch (error) {
        return {status:"fail", message: error.toString()};
    }
}


export const ListByFilterService = async (req) => {
    try {

        let matchConditions = {};
        if (req.body['categoryID']) {
            matchConditions.categoryID = new ObjectId(req.body['categoryID']);
        }
        if (req.body['brandID']) {
            matchConditions.brandID = new ObjectId(req.body['brandID']);
        }
        let MatchStage = { $match: matchConditions };






        let AddFieldsStage = {
            $addFields: { numericPrice: { $toInt: "$price" }}
        };
        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let PriceMatchConditions = {};
        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin };
        }
        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax };
        }
        let PriceMatchStage = { $match: PriceMatchConditions };






        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


































