import React, {useEffect} from 'react';
import Layout from "../component/layout/layout.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import ProductList from "../component/product/ProductList.jsx";

const ProductByKeywordPage = () => {
    const {ListByKeywordRequest} = ProductStore()
    const {keyword} = useParams();

    useEffect(() => {
        (async () => {
            await ListByKeywordRequest(keyword)
        })()
    }, [keyword]);
    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByKeywordPage;