import CartContext from "../context/CartContext";
import axios from 'axios';
import React from 'react';

export default class CartProvider extends React.Component {
    state = {
        cartItems: []
    }

    async componentDidMount() {
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log(accessToken);
        let cartResponse = await axios.get(url + "cart");
        let cart = cartResponse.data;
        this.setState({
            cartItems: cart
        })
    }
    render() {
        const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us62.gitpod.io/api/"
        const cartContext = {
            // getCart: async function () {
            //     let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            //     console.log(accessToken);
            //     let cartResponse = await axios.get(url + "cart");
            //     let cart = cartResponse.data;
            //     console.log(cart);
            //     return cart
            // }
            getCart: () => {
                return this.state.cartItems
            },
            removeItem: async (figureId) => {
                let accessToken = JSON.parse(localStorage.getItem('accessToken'));
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                let cartResponse = await axios.get(url + "cart/" + figureId + "/remove");
                let newCart = cartResponse.data.cart;
                await this.setState({
                    cartItems: newCart
                });
                return this.state.cartItems;
            }
        };
        return (
            <CartContext.Provider value={cartContext}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}