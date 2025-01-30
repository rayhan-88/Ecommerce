import express from 'express';
import {
    BrandList,
    CategoryList,
    ProductDetails,
    ProductListByBrand,
    ProductListByCategory,
    ProductListByFilter,
    ProductListByKeyword,
    ProductListByRemark,
    ProductListByReview,
    ProductListBySmilier,
    SliderList
} from "../controller/ProductController.js";
import {CreateProfile, Logout, ReadProfile, UpdateProfile, UserOTP, VerifyLogin} from "../controller/UserController.js";
import {AuthMiddleware} from "../middleware/AuthMiddleware.js";
import {RemoveWishList, SaveWishList, WishList} from "../controller/WishController.js";
import {CartList, CreateCart, RemoveCart, UpdateCart} from "../controller/CartController.js";
import {
    CreateInvoice, InvoiceList, InvoiceProductList,
    PaymentCancel,
    PaymentFail,
    PaymentIPN,
    PaymentSuccess
} from "../controller/InvoiceController.js";
import {FeaturesList, LegalDetails} from "../controller/FeatureController.js";
const router = express.Router();


// Product API
router.get("/BrandList",BrandList)
router.get('/CategoryList',CategoryList)
router.get('/SliderList',SliderList)
router.get('/ProductListByBrand/:BrandID',ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID',ProductListByCategory)
router.get('/ProductListByRemark/:Remark',ProductListByRemark)
router.get('/ProductListBySmilier/:CategoryID',ProductListBySmilier)
router.get('/ProductDetails/:ProductID',ProductDetails)
router.get('/ProductListByKeyword/:Keyword',ProductListByKeyword)
router.get('/ProductListByReview/:ProductID',ProductListByReview)
router.post('/ProductListByFilter',ProductListByFilter)



// USER API
router.get("/UserOTP/:email",UserOTP)
router.get("/VerifyLogin/:email/:otp",VerifyLogin)
router.get("/Logout",AuthMiddleware,Logout)
router.post("/CreateProfile",AuthMiddleware,CreateProfile)
router.post("/UpdateProfile",AuthMiddleware,UpdateProfile)
router.get("/ReadProfile",AuthMiddleware,ReadProfile)


// Wish api
router.post("/SaveWishList",AuthMiddleware,SaveWishList)
router.get("/RemoveWishList",AuthMiddleware,RemoveWishList)
router.get("/WishList",AuthMiddleware,WishList)


// Cart api
router.post("/CreateCart",AuthMiddleware,CreateCart)
router.post("/UpdateCart/:cartID",AuthMiddleware,UpdateCart)
router.delete("/RemoveCart",AuthMiddleware,RemoveCart)
router.get("/CartList",AuthMiddleware,CartList)


// invoice api
router.get('/CreateInvoice',AuthMiddleware,CreateInvoice)
router.post('/PaymentSuccess/:trxID',AuthMiddleware,PaymentSuccess)
router.post('/PaymentFail/:trxID',AuthMiddleware,PaymentFail)
router.post('/PaymentCancel/:trxID',AuthMiddleware,PaymentCancel)
router.post('/PaymentIPN/:trxID',AuthMiddleware,PaymentIPN)
router.get('/InvoiceList',AuthMiddleware,InvoiceList)
router.get('/InvoiceProductList/:invoice_id',AuthMiddleware,InvoiceProductList)

// Features
router.get('/FeaturesList',FeaturesList)
router.get('/LegalDetails/:type',LegalDetails)









export default router;