import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import LegalContent from "../component/feature/LegalContent.jsx";
import Layout from "../component/layout/layout.jsx";

const AboutPage = () => {
    const {LegalDetailsRequest} = FeatureStore()
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("about")
        })()
    }, []);
    return (
        <Layout>
            <LegalContent/>
        </Layout>
    );
};

export default AboutPage;