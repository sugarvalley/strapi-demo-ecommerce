import axios from "axios";
import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import {useParams} from "react-router";
import Card from "react-bootstrap/Card";
import {useDispatch} from "react-redux";
import {addCart} from "../redux/action";
import {
    BsFillCartCheckFill,
    BsFillCartPlusFill,
    BsFillCartXFill,
    BsFillPatchMinusFill, BsFillPatchPlusFill,
    BsFillStarFill
} from "react-icons/bs";
import {CardGroup, Col, Row, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AddReview from "./AddReview";

const reducerFun = (acc, value) => {
    switch (value.type) {
        case "INCREMENT":
            return {...acc, count: acc.count + 1};
        case "DECREMENT":
            return {...acc, count: acc.count > 1 ? acc.count - 1 : acc.count};

        default:
            console.log("breaking");
            break;
    }
    return acc;
};

function ProductDetails() {
    const {product_id} = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [inStock, setInStock] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [loadingFinished, setLoadingFinished] = useState(false);
    const [state, change] = useReducer(reducerFun, {count: 1});
    const [quantity, setQuantity] = useState(null);
    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:1337/api/products/${product_id}?populate=*`,
        }).then((res) => {
            setProduct(res.data.data)
            setReviews(res.data.data.attributes.reviews.data)
            setQuantity(res.data.data.attributes.quantity)
            if (res.data.data.attributes.quantity > 0) {
                setInStock(true)
            }
        })
    }, [reviews])


    const handleClick = () => {
        setLoading(true)
        addProduct(product)
        setLoadingFinished(true)
    };

    const averageRating = () => {
        let value = 0;
        let counter = 0;
        reviews.map((review) => {
            value += review.attributes.rating
            counter++;
        })
        return Math.round(value / counter);
    }

    return (
        <>
            <div className="container justify-content-center">
                {!product ? (
                    <span>Loading...</span>
                ) : (
                    <CardGroup>
                        <Card text="dark" bg="light" border="dark" className="flex-fill"
                              style={{maxWidth: "60rem", margin: "1em"}}>
                            <Card.Body>
                                <div>
                                    <div style={{textAlign: "center"}}>
                                        <Card.Img variant="top" style={{maxWidth: "20rem"}}
                                                  src={`http://localhost:1337/uploads/${product.attributes.images.data[0].attributes.name}`}/>
                                        <Card.Title>{[...Array(averageRating())].map((e, i) =>
                                            <BsFillStarFill/>)}</Card.Title>
                                        <Card.Title>{product.attributes.name}</Card.Title>
                                        <Card.Subtitle>{product.attributes.price} zł
                                            | {inStock ? `${product.attributes.quantity} in stock` : "unavailable"}</Card.Subtitle>
                                        <br/>
                                        <Card.Text>{product.attributes.description}</Card.Text>
                                    </div>
                                    <br/>
                                    <div style={{textAlign: "right"}}>
                                        <Card.Text>Standard delivery - <strong>20zł</strong></Card.Text>
                                        <Card.Text>Free delivery - orders above <strong>500 zł</strong></Card.Text>
                                        <Card.Text>Total price with delivery
                                            - <strong>{product.attributes.price + 20} zł</strong></Card.Text>
                                        <Card.Text>You can check your free delivery at <strong>cart</strong></Card.Text>
                                        <div className="d-flex flex-fill float-end">
                                            <Row>
                                                <Col><Button variant="dark" onClick={() => change({type: 'DECREMENT'})}><BsFillPatchMinusFill/></Button></Col>
                                                <Col><Card.Title variant="dark">{state.count}</Card.Title></Col>
                                                <Col><Button variant="dark"
                                                             disabled={state.count < quantity ? false : true}
                                                             onClick={() => change({type: 'INCREMENT'})}>< BsFillPatchPlusFill/></Button></Col>
                                                <Col><Button variant="dark" onClick={!isLoading ? handleClick : null}>
                                                    {inStock ? isLoading ? loadingFinished ? <BsFillCartCheckFill/> :
                                                            <Spinner as="span" animation="border" size="sm"
                                                                     role="status" aria-hidden="true"/> :
                                                        <BsFillCartPlusFill/> : <BsFillCartXFill/>}
                                                </Button></Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card text="dark" bg="light" className="flex-fill" border="dark"
                              style={{maxWidth: "20rem", margin: "1em", textAlign: "center"}}>
                            <Card.Body>
                                <div>
                                    <div>
                                        <Card.Title>Reviews</Card.Title>
                                        <br/>
                                        {reviews.map((review) => (
                                            <blockquote className="blockquote">
                                                <p>{[...Array(review.attributes.rating)].map((e, i) =>
                                                    <BsFillStarFill/>)} </p>
                                                <p>
                                                    {' '}
                                                    {review.attributes.review}
                                                    {' '}
                                                </p>
                                                <footer
                                                    className="blockquote-footer">{review.attributes.reviewer_name}</footer>
                                            </blockquote>
                                        ))}
                                    </div>
                                    <br/>
                                    <div>
                                        <Card.Title>Add your own review</Card.Title>
                                        <br/>
                                        <AddReview product_id={product_id}/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                )}
            </div>
        </>
    );
}

export default ProductDetails;