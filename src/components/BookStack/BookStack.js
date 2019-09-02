import React from "react";
import styles from './BookStack.module.css';

import BookDisplay from '../BookDisplay/BookDisplay';
const bookStack = (props) => {

    return (
        <div className={styles.main}>
            <h1 className={styles.heading}>{props.heading}</h1>
            <div className={styles.stack}>
                { props.books.map(book => <BookDisplay key={book} book={book} />)}
            </div>
        </div>
    )
}

export default bookStack;