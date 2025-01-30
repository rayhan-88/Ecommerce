import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrandPage from "./pages/ProductByBrandPage.jsx";
import ProductByCategoryPage from "./pages/ProductByCategoryPage.jsx";
import ProductByKeywordPage from "./pages/ProductByKeywordPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HowToBuyPage from "./pages/HowToBuyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import RefundPage from "./pages/RefundPage.jsx";
import ComplainPage from "./pages/ComplainPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PrivetRoute from "./component/PrivetRoute/PrivetRoute.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishPage from "./pages/WishPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OtpPage from "./pages/OtpPage.jsx";
import {Toaster} from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage.jsx";



const App = () => {
    return (
        <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false}/>
            <Routes>
                {/*Product Routes*/}
                <Route exact path='/' element={<HomePage/>} />
                <Route exact path='/by-brand/:id' element={<ProductByBrandPage/>} />
                <Route exact path='/by-category/:id' element={<ProductByCategoryPage/>} />
                <Route exact path='/by-keyword/:keyword' element={<ProductByKeywordPage/>} />
                <Route exact path='/details/:id' element={<ProductDetailsPage/>} />

                {/*Legal Routes*/}
                <Route exact path='/about' element={<AboutPage/>} />
                <Route exact path='/refund' element={<RefundPage/>} />
                <Route exact path='/terms' element={<TermsPage/>} />
                <Route exact path='/how-to-buy' element={<HowToBuyPage/>} />
                <Route exact path='/contact' element={<ContactPage/>} />
                <Route exact path='/complain' element={<ComplainPage/>} />

                {/*Cart , Wish , Payment Routes*/}
                {/*<Route exact path='/cart' element={<PrivetRoute><CartPage/></PrivetRoute>} />*/}
                {/*<Route exact path='/wish' element={<PrivetRoute><WishPage/></PrivetRoute>} />*/}

                {/*User Route*/}
                <Route exact path='/login' element={<LoginPage/>} />
                <Route exact path='/otp' element={<OtpPage/>} />
                <Route exact path='/profile' element={<ProfilePage/>} />

            </Routes>

        </BrowserRouter>
    );
};

export default App;