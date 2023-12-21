import React from "react";
import {ProductList} from "./ProductList";

export function About() {
    return (
        <div style={{height: "100vh", textAlign: "center"}}>
            <h1>WE R ALL BLVCK</h1>
            <p>ALL ITEMS HAVE THE SAME UNI SIZE</p>
            <h1>LIVE</h1>
            <h1>LAUGH</h1>
            <h1>LOVE</h1>
            <h1>SHOP</h1>
            <h1>BLVCK</h1>
            <h1>STUFF</h1>
        </div>
    );
}

export function Products() {
    return (
        <ProductList/>
    );
}

export function Hoodies() {
    return (
        <ProductList category={"hoodies"}/>
    );
}

export function Shirts() {
    return (
        <ProductList category={"t-shirts"}/>
    );
}

export function Accessories() {
    return (
        <ProductList category={"accessories"}/>
    );
}


export function Whoops404() {
    return (
        <div>
            <h1>Resource not found</h1>
        </div>
    );
}