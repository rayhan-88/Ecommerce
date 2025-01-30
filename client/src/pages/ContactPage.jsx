import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../component/layout/layout.jsx";
import LegalContent from "../component/feature/LegalContent.jsx";

const ContactPage = () => {
    const {LegalDetailsRequest} = FeatureStore()
    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("contact")
        })()
    }, []);
    return (
        <Layout>
            <LegalContent/>
        </Layout>
    );
};

export default ContactPage;