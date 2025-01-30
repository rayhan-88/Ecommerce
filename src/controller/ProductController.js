import {
    BrandServices,
    CategoryServices,
    DetailsService,
    ListByBrandService,
    ListByCategoryService,
    ListByFilterService,
    ListByKeywordService,
    ListByRemarkService,
    ListBySmilierService,
    ReviewListService,
    SliderServices
} from "../services/ProductServices.js";

export const BrandList = async (req, res) => {
    let result = await BrandServices()
        res.json(result)
}

export const CategoryList = async (req, res) => {
    let result = await CategoryServices()
    res.json(result)
}



export const SliderList = async (req, res) => {
    let result = await SliderServices()
    res.json(result)
}


export const ProductListByBrand = async (req, res) => {
    let result = await ListByBrandService(req)
    res.json(result)
}


export const ProductListByCategory = async (req, res) => {
    let result = await ListByCategoryService(req)
    res.json(result)
}

export const ProductListByRemark = async (req, res) => {
    let result = await ListByRemarkService(req)
    res.json(result)
}


export const ProductListBySmilier= async (req, res) => {
    let result = await ListBySmilierService(req)
    res.json(result)
}


export const ProductDetails= async (req, res) => {
    let result = await DetailsService(req)
    res.json(result)
}


export const ProductListByKeyword= async (req, res) => {
    let result = await ListByKeywordService(req)
    res.json(result)
}

export const ProductListByReview= async (req, res) => {
    let result = await ReviewListService(req)
    res.json(result)
}



export const ProductListByFilter = async (req, res) => {
    let result = await ListByFilterService(req)
    res.json(result)
}













