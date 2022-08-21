import React, { useEffect } from 'react';
import CartContext from '../context/CartContext';
import axios from 'axios';

export default function Cart(props) {
    const cartContext = React.useContext(CartContext);
    const [cart, setCart] = React.useState([]);
    useEffect(() => {
        const cartItems = cartContext.getCart();
        setCart(cartItems)
    });
    // setCart(cartContext.getCart());
    console.log('cart=>', cart);
    console.log(cartContext.getCart());
    const [quantity, setQuantity] = React.useState();

    const Checkout = async () => {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log(accessToken);
        let checkoutResponse = await axios.post(props.url + "checkout", {
            customer_email: "customer@email.com",
            block_street: "testing block",
            unit: "testing unit",
            postal: "testing postal"
        });
        console.log(checkoutResponse.data);
        window.location.href = checkoutResponse.data.url
    }

    return (
        <React.Fragment>
            <div className="container my-2">
                <h1>Your cart:</h1>
                <div className="list-group my-2">
                    {cart.map(each => {
                        return (
                            <div className="list-group-item">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={each.figure.image_url} style={{"height": "150px"}} />
                                    </div>
                                    <div className="col-8">
                                        <h4>{each.figure.name}</h4>
                                        <h6>${(each.figure.cost/100).toFixed(2)}</h6>
                                        <div className="container">
                                            <button className="btn btn-sm">+</button>
                                            <input type="text" className="form-control text-center" value={each.quantity}
                                            style={{"width": "50px", "display": "inline-block"}}/>
                                            <button className="btn btn-sm">-</button>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-end">
                                            Subtotal: ${((each.figure.cost * each.quantity)/100).toFixed(2)} 
                                        </div>
                                    </div>
                                    <div className="col-1 text-end">
                                        <button className="btn btn-sm" onClick={() => cartContext.removeItem(each.figure.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="d-flex justify-content-end">
                <button className="btn btn-danger text-end" onClick={Checkout}>Checkout</button>
                </div>
            </div>
        </React.Fragment>
    )
}