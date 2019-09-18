import React from "react";
import styles from "./SubToolBar.module.css";
import { Link } from "react-router-dom";

const subtoolbar = () => {
    return (
        <div className={styles.main}>
            <div className={styles.toolbar}>
                <Link>Categories</Link>
                <Link>New Releases</Link>
                <Link to="/sell">Sell</Link>
                <Link>Donate</Link>
            </div>
        </div>
    )
}

export default subtoolbar;