import React, {useEffect} from 'react';
import Layout from "../component/layout/layout.jsx";
import {useParams} from "react-router-dom";
import ProductStore from "../store/ProductStore.js";
import ProductList from "../component/product/ProductList.jsx";

const ProductByCategoryPage = () => {
    const {ListByCategoryRequest} = ProductStore()
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await ListByCategoryRequest(id)
        })()
    }, [id]);
    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByCategoryPage;