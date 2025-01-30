import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../component/layout/layout.jsx";
import LegalContent from "../component/feature/LegalContent.jsx";

const ComplainPage = () => {
    const {LegalDetailsRequest} = FeatureStore()
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("complain")
        })()
    }, []);
    return (
        <Layout>
            <LegalContent/>
        </Layout>
    );
};

export default ComplainPage;