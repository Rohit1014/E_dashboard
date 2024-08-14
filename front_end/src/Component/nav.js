import React from "react";
import {  Link, useNavigate } from "react-router-dom";
import logo from"../assets/images.jpg"

const Nav=()=>{
    const auther=localStorage.getItem("val")
    const navigate=useNavigate();
    const isDisabled=true
    const logout=()=>{
             localStorage.clear();
             navigate("/login")
    }
    return(
        <div  className="navbar">
            <img src={logo}  alt="" className="logo"/>
        { auther?
            <ul  className="navbar-menu">
                <li  className="navbar-item"><Link to="/">Products</Link></li>
                <li className="navbar-item"><Link to="/add">Add Products</Link></li>
                <li className="navbar-item">
                {isDisabled ? <span className="disabled-link">Update Product</span> : <Link to="/update/:id">Update Product</Link>}
                   </li>
                <li className="navbar-item"><Link to="/profile">Profile</Link></li>
                <li className="navbar-item"><Link onClick={logout} to="/login">Logout({JSON.parse(auther).name})</Link></li>
                </ul>
                :
                <ul className="nav-right">
                    <li className="navbar-item"><Link to="/signup">Signup</Link></li>
                    <li className="navbar-item"><Link to="/login">Login</Link></li>
                </ul>
                }
            </div>
    );

}

export default Nav;