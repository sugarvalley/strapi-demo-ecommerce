import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {
    About, Accessories, Hoodies,
    Products, Shirts,
    Whoops404
} from "./components/pages.js";
import {Home} from "./components/Home";
import MainNavbar from "./components/MainNavbar";
import ProductDetails from "./components/ProductDetails";
import 'react-toastify/dist/ReactToastify.css'
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
    return (
        <div>
            <BrowserRouter>
                <MainNavbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/about"
                        element={<About/>}
                    />
                    <Route
                        path="/products"
                        element={<Products/>}
                    />
                    <Route
                        path="/:product_id"
                        element={<ProductDetails/>}
                    />
                    <Route
                        path="/cart"
                        element={<Cart/>}
                    />

                    <Route
                        path="/hoodies"
                        element={<Hoodies/>}
                    />

                    <Route
                        path="/shirts"
                        element={<Shirts/>}
                    />

                    <Route
                        path="/accessories"
                        element={<Accessories/>}
                    />

                    <Route
                        path="/checkout"
                        element={<Checkout/>}
                    />

                    <Route path="*" element={<Whoops404/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;