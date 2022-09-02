import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import Profile from './Profile';
import Register from './Register';
import axios from 'axios';
import '../App.css'

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Orders from './Orders';
import Login from './Login';
import ProductContext from '../context/ProductContext';
import ProductProvider from '../contextProviders/ProductProvider';
import CartProvider from '../contextProviders/CartProvider';
import OrderProvider from '../contextProviders/OrderProvider';
import CartContext from '../context/CartContext';
import NavBar from '../pages/NavBar';
import UserContext from '../context/UserContext';


export default function NavigationBar() {
    const url = "https://3000-evelyntys-project3expre-g5hw291acox.ws-us63.gitpod.io/api/"
    const cartContext = React.useContext(CartContext);
    const userContext = React.useContext(UserContext);
    const user = userContext.getName();
    // const navigate = useNavigate();

    const Logout = async () => {
        let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        let logoutResponse = await axios.post(url + "users/logout", {
            refreshToken
        });
        console.log(logoutResponse.data);
        await localStorage.removeItem('accessToken');
        await localStorage.removeItem('refreshToken');
        // navigate("/")
    };

    //   const getProfile = () => {

    //   }

    return (

        <Navbar collapseOnSelect expand="lg" className="navbar-color">
            <div className="container-fluid">
                <Navbar.Brand className="mx-auto m-lg-0" as={NavLink} to="/">
                    <img src={require("../images/logo.png")} style={{ "height": "40px" }} className="mx-2" />
                    FIGU屋
                </Navbar.Brand>
                <div className="d-none d-lg-block">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="d-none" />
                    <Navbar.Collapse className="d-none d-lg-block" id="responsive-navbar-nav">
                        <Nav className="ms-auto me-5">
                            {/* <CartContext.Consumer> */}
                            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                            {userContext.getUserState() ?
                                <React.Fragment>
                                    <Nav.Link as={NavLink} to="/cart" className="position-relative mx-2">Cart
                                        {
                                            userContext.getUserState() ? (
                                                cartContext.getState().length > 0 ? (<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {cartContext.getState().length}
                                                </span>) : null) : null
                                        }
                                    </Nav.Link>
                                    <img className="ms-2" src={require("../images/user.png")} style={{ "height": "30px" }} />
                                    <NavDropdown title={user} id="collasible-nav-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/profile" onClick={() => userContext.getProfile()}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/orders">
                                            Orders
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} onClick={() => userContext.logout()} to="/login">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </React.Fragment>
                                : <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </div>
        </Navbar>



    )
}