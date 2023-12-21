import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCart, delCart} from "../redux/action";
import {Link} from "react-router-dom";
import {BsFillPatchMinusFill, BsFillPatchPlusFill} from "react-icons/bs";

function Cart() {
    const state = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();
    let value = 0;

    const handleAdd = (item) => {
        dispatch(addCart(item));
    };
    const handleDel = (item) => {
        dispatch(delCart(item));
    };

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>your cart is empty:(</h3>
                    </div>
                </div>
            </div>
        );
    };

    const cartItems = (product) => {
        return (
            <>
                <div className="px-4 my-5 bg-light rounded-3 py-5">
                    <div className="container py-4">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <img
                                    src={`http://localhost:1337/uploads/${product.attributes.images.data[0].attributes.name}`}
                                    alt={product.attributes.name}
                                    height="200px"
                                    width="180px"
                                />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.attributes.name}</h3>
                                <p className="lead fw-bold">
                                    {product.qty} x {product.attributes.price} zł =
                                    {product.qty * product.attributes.price} zł
                                    <p hidden>{value += product.qty * product.attributes.price}</p>
                                </p>
                                <button
                                    className="btn btn-outline-dark me-4"
                                    onClick={() => handleDel(product)}
                                >
                                    <BsFillPatchMinusFill/>
                                </button>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleAdd(product)}
                                >
                                    < BsFillPatchPlusFill/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const buttons = () => {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <button className="btn btn-outline-light mb-5 w-25 mx-auto">total price: {value > 500 ?
                            <span>{value} zł with free delivery!</span> :
                            <span>{value + 20} zł (20zł delivery included)</span>}</button>
                    </div>
                    <div className="row">
                        <Link
                            to="/checkout"
                            className="btn btn-outline-light mb-5 w-25 mx-auto"
                        >
                            proceed to checkout
                        </Link>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div>
                {state.length === 0 && emptyCart()}
                {state.length !== 0 && state.map(cartItems)}
                {state.length !== 0 && buttons()}

            </div>
        </>
    );
}

export default Cart;