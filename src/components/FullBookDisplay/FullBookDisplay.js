import React from 'react';
import styles from './FullBookDisplay.module.css';

import { database } from '../firebase/firebase.app';

import bookImg from '../../resources/book2.jpg';
class FullBookDisplay extends React.Component {
    

    state = { }

    componentDidMount() {
        database.ref(`books/${this.props.match.params.id}`).once("value", snapshot => {
            if(snapshot.val()) {
                let book = snapshot.val();
                console.log(book);
                this.setState({
                    book: book
                })
            } else {
                alert("Could not fetch!");
            }
        })
    }

    render() {
    
        return (
            <div className={styles.main}>
                <div className={styles.leftDiv}>
                    <img src={bookImg} alt="book cover" className={styles.img}/>
                    <h4 className={styles.category}>Tags:</h4>
                    <p>Action, Crime, Thriller</p>
                </div>
                <div className={styles.rightDiv}>
                    <h1>{this.state.book ? this.state.book.bookName: null}</h1>
                    <p><em>by</em></p>
                    <h2>{this.state.book ? this.state.book.author : null }</h2>
                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>
                            { this.state.book ? this.state.book.description : null}
                        </p>
                    </div>
                    
                </div>

                <div className={styles.lastDiv}>

                </div>
            </div>
        )
    } 
}

export default FullBookDisplay;