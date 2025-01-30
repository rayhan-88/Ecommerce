import React, {useEffect} from 'react';
import Layout from "../component/layout/layout.jsx";
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import ProductList from "../component/product/ProductList.jsx";

const ProductByBrandPage = () => {
    const {ListByBrandRequest} = ProductStore()
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await ListByBrandRequest(id)
        })()
    }, [id]);
    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByBrandPage;