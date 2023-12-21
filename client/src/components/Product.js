import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {BsFillCartCheckFill, BsFillCartPlusFill, BsFillCartXFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Col, OverlayTrigger, Row, Spinner, Tooltip} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addCart} from "../redux/action";


function Product({product, name, description, image, price, quantity, id}) {
    const [inStock, setInStock] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [loadingFinished, setLoadingFinished] = useState(false);
    const [shortDescription, setShortDescription] = useState('');

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }

    useEffect(() => {
            if (quantity > 0) {setInStock(true)}
            setShortDescription(description.split('.')[0])
    }, [])

    const handleClick = () => {
        setLoading(true)
        addProduct(product)
        setLoadingFinished(true)
    };

    return (
        <Card text="dark" bg="light" className="flex-fill" border="dark"
              style={{  maxWidth: "20rem", margin:"1em", minHeight:"40rem",
                        textAlign:"center"}}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <div className="d-flex flex-column">
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {shortDescription}
                    </Card.Text>
                    <Link to={`/${id}`}><Card.Text>read more</Card.Text></Link>
                </div>
            </Card.Body>
            <Card.Footer>
                <Container>
                    <Row>
                        <Col sm={4} style={{marginTop:"0.5em"}} >
                            <OverlayTrigger key="top" placement="top"
                                overlay={
                                    <Tooltip id="tooltip-top">
                                        with delivery <strong>{price + 20} zł</strong>.
                                    </Tooltip>
                                }
                            >
                                <Button variant="dark">{price} zł</Button></OverlayTrigger></Col>
                        <Col sm={6} style={{marginTop:"0.5em"}}><Button size="nm" variant="dark">{inStock ? `${quantity} in stock` : "unavailable"}</Button></Col>
                        <Col sm={2} style={{marginTop:"0.5em"}}><Button variant="dark" onClick={!isLoading ? handleClick : null}>
                            {inStock ? isLoading ? loadingFinished ? <BsFillCartCheckFill/> : <Spinner as="span" animation="border" size="sm"
                            role="status" aria-hidden="true" /> : <BsFillCartPlusFill/> : <BsFillCartXFill/>}
                        </Button></Col>
                    </Row>
                </Container>
            </Card.Footer>
        </Card>
    );
}

export default Product;