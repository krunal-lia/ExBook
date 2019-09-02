import React from "react";
import styles from './BookDisplay.module.css';

import book1 from '../../resources/book1.jpg';
import book2 from '../../resources/book2.jpg';
import book3 from '../../resources/book3.jpg';
import book4 from '../../resources/book4.jpg';
import book5 from '../../resources/book5.jpg';
import book6 from '../../resources/book6.jpg';

const books = [book1, book2, book3, book4, book5, book6];

const bookDisplay = (props) => {

    return (
        <div className={styles.book}>
            <div className={styles.bookInner}>
                <div className={styles.bookFront}>
                     <img src={books[parseInt(props.book) - 1]} alt="book cover" className={styles.img}/>
                </div>
                <div className={styles.bookBack}>
                    <h1>asd</h1>
                </div>
            </div>
        </div>
    )
}

export default bookDisplay;