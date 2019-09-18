import React from "react";
import styles from './BookStack.module.css';

import BookDisplay from './BookDisplay/BookDisplay';

const bookStack = (props) => {

    
    return (
        <div key={props.key} className={styles.main}>
            <h1 className={styles.heading}>{props.heading}</h1>
            <div className={styles.stack}>
                { props.bookDetails.map((book, index) => <BookDisplay key={book} book={book}/>)}
            </div>
        </div>
    )
}

export default bookStack;