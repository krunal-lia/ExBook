import React from "react";
import styles from './BookDisplay.module.css';

import { Link } from 'react-router-dom';

import book1 from '../../../../resources/book1.jpg';
import book2 from '../../../../resources/book2.jpg';
import book3 from '../../../../resources/book3.jpg';
import book4 from '../../../../resources/book4.jpg';
import book5 from '../../../../resources/book5.jpg';
import book6 from '../../../../resources/book6.jpg';
import book7 from '../../../../resources/book7.jpg';
import book8 from '../../../../resources/book8.jpg';
import book9 from '../../../../resources/book9.jpg';
import book10 from '../../../../resources/book10.jpg';
import book11 from '../../../../resources/book11.jpg';
import book12 from '../../../../resources/book12.jpg';
import book13 from '../../../../resources/book13.jpg';
import book14 from '../../../../resources/book14.jpg';
import book15 from '../../../../resources/book15.jpg';
import book16 from '../../../../resources/book16.jpg';

import Button from '../../../UI/Button/Button';

const books = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14, book15, book16];

const bookDisplay = (props) => {

    console.log(props.book);
    return (
        <div className={styles.book}>
            <div className={styles.bookInner}>
                <div className={styles.bookFront}>
                    { props.book ? 
                     <img src={books[Math.floor(Math.random() * 16)]} alt="book cover" className={styles.img}/> : null}
                </div>
                <div className={styles.bookBack}>
                    <p>Book Original Price: {props.book.originalPrice}</p>
                    <p>Our Selling Price: {props.book.sellingPrice}</p>
                    <p>Condition: {props.book.condition}</p>
                    <Button btnType="Success"><Link to={"/book/" + props.book.index}>Proceed</Link></Button>
                </div>

              
            </div>
        </div>
    )
}

export default bookDisplay;