import React, {useEffect} from 'react';
import Layout from "../component/layout/layout.jsx";
import SliderSkeleton from "../skeleton/SliderSkeleton.jsx";
import FeatureSkeleton from "../skeleton/FeatureSkeleton.jsx";
import CategorySkeleton from "../skeleton/CategorySkeleton.jsx";
import ProductSkeleton from "../skeleton/ProductSkeleton.jsx";
import BrandSkeleton from "../skeleton/BrandSkeleton.jsx";
import ProductStore from "../store/ProductStore.js";
import FeatureStore from "../store/FeatureStore.js";
import Slider from "../component/product/Slider.jsx";
import Feature from "../component/feature/Feature.jsx";
import Category from "../component/product/Category.jsx";
import Product from "../component/product/Product.jsx";
import BrandList from "../component/product/BrandList.jsx";

const HomePage = ()=>{
    const {SliderListRequest,CategoryListRequest,BrandListRequest,ListRemarkRequest} = ProductStore();
    const {FeatureListRequest} = FeatureStore();


    useEffect(()=>{
        (async ()=>{
            await SliderListRequest();
            await FeatureListRequest();
            await CategoryListRequest();
            await ListRemarkRequest("new");
            await BrandListRequest();

        })()
    },[])



    return (
        <Layout>
            <Slider/>
            <Feature/>
            <Category/>
            <Product/>
            <BrandList/>
        </Layout>
    )
}

export default HomePage;