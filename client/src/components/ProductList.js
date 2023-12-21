import React, {useEffect, useState} from "react";
import axios from "axios";
import {CardGroup} from "react-bootstrap";
import Product from "./Product";

export function ProductList(category) {
    const [productsAll, setProductsAll] = useState([])
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:1337/api/products?populate=*',
        }).then((res) => {
            setProductsAll(res.data.data)
        })
    }, [])

    useEffect(() => {
        if (category.category === undefined) {
            setProducts(productsAll);
        } else {
            setProducts(productsAll.filter(filterCat));
        }
    }, [productsAll])

    const filterCat = (item) => {
        if (item.attributes.category.data.attributes.name === category.category) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <CardGroup style={{justifyContent: "center"}}>
            {products.map((product) => (
                <Product
                    product={product}
                    name={product.attributes.name}
                    image={`http://localhost:1337/uploads/${product.attributes.images.data[0].attributes.name}`}
                    description={product.attributes.description}
                    price={product.attributes.price}
                    quantity={product.attributes.quantity}
                    id={product.id}
                />
            ))}
        </CardGroup>
    );
}