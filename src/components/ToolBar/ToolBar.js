import React from "react";


import styles from "./ToolBar.module.css";
import Logo from "../UI/Logo/Logo";
import { Link } from "react-router-dom";
import Button from '../UI/Button/Button';
import firebase from '../firebase/firebase.app';

function Toolbar(props)  {

    let user = null;
    if(props.isLoggedin) {
        user = <Link>Welcome {props.userName}</Link>
    } else {
        user = <Link to="/login">Login</Link>
    }

    function logOut() {
        firebase.auth().signOut();
        window.location.reload();
    }
    return (
        <div className={styles.main}>
            <Link to="/"> <Logo /> </Link>

            <div className={styles.searchDiv}>
                <Link><i className={styles.searchIcon + " material-icons"}>
                        search
                </i></Link> 
                <input 
                type="text" 
                className={styles.searchBox}
                placeholder="Search for Books / Categories / Authors" /> 
            </div>
           
           <div className={styles.rightDiv}>
                { user }
                <Link className={styles.cart}>
                   
                    <i className={styles.cartIcon + " material-icons"}>
                        shopping_cart
                    </i>
                    Cart
                </Link>
                { props.isLoggedin ? <a className={styles.logout} href="#" onClick={()=> logOut()}>Logout</a> : null }
           </div>

           
        </div>
    )
}

export default Toolbar;