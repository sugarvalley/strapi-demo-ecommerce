import React, {useState} from 'react';
import {useFormik} from 'formik';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {BsCheckCircle, BsPlusCircle} from "react-icons/bs";
import {Spinner} from "react-bootstrap";
import axios from "axios";

function AddReview(product_id) {
    const [isSubmitting, setSubmitting] = useState(false);
    const [submitFinished, setSubmitFinished] = useState(false);
    const id = JSON.parse(Object.values(product_id).map((value, index) => {
        return value
    }))

    const formik = useFormik({
        initialValues: {
            product: {id},
            review: '',
            reviewer_name: 'hyperrrz',
            rating: '',
        },
        onSubmit: (values) => {
            setSubmitting(true);
            const data = {
                data: {
                    product: values.product,
                    review: values.review,
                    reviewer_name: values.reviewer_name,
                    rating: values.rating
                }
            };

            axios.post('http://localhost:1337/api/reviews', data)
                .then(response => {
                    setSubmitting(false);
                    setSubmitFinished(true);
                })
                .catch(error => {
                    console.log(error);
                    setSubmitting(false);
                })

        },
        validate: (values) => {
            const errors = {};

            if (!values.review) {
                errors.review = 'Description is required';
            }
            if (!values.rating) {
                errors.rating = 'Rating is required';
            }
            return errors;
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Card.Text>Your review will be added as</Card.Text>
                <Card.Subtitle>hyperrrz</Card.Subtitle>
                <br/>
                <label>
                    <Card.Subtitle>Rating:</Card.Subtitle>
                    <input type="number" name="rating" onChange={formik.handleChange} value={formik.values.rating}
                           min={1} max={5}/>
                    {formik.errors.rating ? <div>{formik.errors.rating}</div> : null}
                </label>
                <br/>
                <br/>
                <label>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <input type="text" name="review" onChange={formik.handleChange} value={formik.values.review}/>
                    {formik.errors.review ? <div>{formik.errors.review}</div> : null}
                </label>
                <br/>
                <br/>
                <Button size="nm" variant="dark" type="submit" disabled={isSubmitting || submitFinished}>{isSubmitting ?
                    <Spinner as="span" animation="border"
                             size="sm" role="status" aria-hidden="true"/> : submitFinished ? <BsCheckCircle/> :
                        <BsPlusCircle/>}</Button>
            </form>
        </>
    );
}

export default AddReview;