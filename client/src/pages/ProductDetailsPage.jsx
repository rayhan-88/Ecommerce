import React, {useEffect} from 'react';
import ProductDetails from "../component/product/ProductDetails.jsx";
import Layout from "../component/layout/layout.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";

const ProductDetailsPage = () => {
    const {ProductDetailsRequest,ProductReviewRequest} = ProductStore()
    const {id} = useParams();
    useEffect(() => {
        (async () => {
           await ProductDetailsRequest(id)
           await ProductReviewRequest(id)
        })()
    }, []);
    return (
        <Layout>
            <ProductDetails/>

        </Layout>
    );
};

export default ProductDetailsPage;