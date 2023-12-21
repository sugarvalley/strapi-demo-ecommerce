import {useFormik} from "formik";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Spinner} from "react-bootstrap";
import {BsCheckCircle} from "react-icons/bs";
import React, {useState} from "react";


function Checkout() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [detailsMessage, setDetailsMessage] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [city, setCity] = useState(null);
    const [delivery, setDelivery] = useState(null);
    const [payment, setPayment] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            address: '',
            postalCode: '',
            city: '',
            delivery: '',
            payment: '',
        },
        onSubmit: (values) => {
            setSubmitting(true);
            setName(values.name);
            setEmail(values.email);
            setAddress(values.address);
            setPostalCode(values.postalCode);
            setCity(values.city);
            setDelivery(values.delivery);
            setPayment(values.payment);
            setDetailsMessage("Please check your information below")
            setSubmitting(false);
        },
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = 'Name is required';
            } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {

            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
                errors.email = 'Invalid email address';
            }

            if (!values.address) {
                errors.address = 'Address is required';
            } else if (!/^[a-zA-Z0-9\s,'-]+$/.test(values.address)){
                errors.address = 'Invalid address';
            }

            if (!values.city) {
                errors.city = 'City is required';
            } else if (!/^[a-zA-Z\s]+$/.test(values.city)) {

            }

            if (!values.postalCode) {
                errors.postalCode = 'Postal code is required';
            } else if (!/^[0-9]+$/.test(values.postalCode)){
                errors.postalCode = 'Invalid postal code address';
            }

            if (!values.payment) {
                errors.payment = 'Please choose your payment method';
            }

            if (!values.delivery) {
                errors.delivery = 'Please choose your delivery option';
            }

            return errors;
        },
    });

    const success = () => {
        setSuccessMessage("Thank you, " + name + ", your order has been placed successfully! 🖤");
    }

    return (
        <><div className="d-flex justify-content-center">
            <form onSubmit={formik.handleSubmit}>
                <Card text="dark" bg="light" border="dark" className="flex-fill"
                      style={{width:"20em", margin: "1em", textAlign: "center"}}>
                    <Card.Title>hi hyperrrz</Card.Title>
                    <Card.Subtitle>ready to place your order?</Card.Subtitle>
                    <br/>
                    <label>
                        <Card.Subtitle>Name:</Card.Subtitle>
                        <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name}/>
                        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                    </label>
                    <br/>
                    <label>
                        <Card.Subtitle>Email:</Card.Subtitle>
                        <input type="text" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    </label>
                    <br/>
                    <label>
                        <Card.Subtitle>Address:</Card.Subtitle>
                        <input type="text" name="address" onChange={formik.handleChange} value={formik.values.address}/>
                        {formik.errors.address ? <div>{formik.errors.address}</div> : null}
                    </label>
                    <br/>
                    <label>
                        <Card.Subtitle>Postal Code:</Card.Subtitle>
                        <input type="text" name="postalCode" onChange={formik.handleChange} value={formik.values.postalCode}/>
                        {formik.errors.postalCode ? <div>{formik.errors.postalCode}</div> : null}
                    </label>
                    <br/>
                    <label>
                        <Card.Subtitle>City:</Card.Subtitle>
                        <input type="text" name="city" onChange={formik.handleChange} value={formik.values.city}/>
                        {formik.errors.city ? <div>{formik.errors.city}</div> : null}
                    </label>
                    <br/>
                    <label>
                        <Card.Subtitle>Delivery options:</Card.Subtitle>
                        <select name="delivery" onChange={formik.handleChange} value={formik.values.delivery}>
                        <option value="inpost">InPost 1-2 days</option>
                        <option value="dhl">DHL 2-3 days</option>
                        <option value="poczta">PocztaPL 1-2 days</option>
                        </select>
                        {formik.errors.delivery ? <div>{formik.errors.delivery}</div> : null}
                    </label>
                    <br/>
                    <label>
                        <Card.Subtitle>Payment method:</Card.Subtitle>
                        <select name="payment" onChange={formik.handleChange} value={formik.values.payment}>
                            <option value="card">Visa/Mastercard</option>
                            <option value="blik">BLIK</option>
                            <option value="paypal">PayPal</option>
                        </select>
                        {formik.errors.payment ? <div>{formik.errors.payment}</div> : null}
                    </label>
                    <br/>
                    <Button variant="dark" type="submit" disabled={isSubmitting}>{isSubmitting ?
                        <Spinner as="span" animation="border"
                                 size="sm" role="status" aria-hidden="true"/> : <BsCheckCircle/>}</Button>
                    <div className="success-message">{detailsMessage}</div>
                    <div className="success-message">{name}</div>
                    <div className="success-message">{email}</div>
                    <div className="success-message">{address}</div>
                    <div className="success-message">{postalCode}</div>
                    <div className="success-message">{city}</div>
                    <div className="success-message">{delivery}</div>
                    <div className="success-message">{payment}</div>
                    <div className="success-message">
                        <Button variant="dark" hidden={!detailsMessage} onClick={success}>Order now</Button>
                        <div className="success-message">{successMessage}</div>
                    </div>
                </Card>
            </form>
        </div>
        </>
    );
}

export default Checkout;