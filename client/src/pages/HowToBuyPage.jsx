import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../component/layout/layout.jsx";
import LegalContent from "../component/feature/LegalContent.jsx";

const HowToBuyPage = () => {
    const {LegalDetailsRequest} = FeatureStore()
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("howtobuy")
        })()
    }, []);
    return (
        <Layout>
            <LegalContent/>
        </Layout>
    );
};

export default HowToBuyPage;