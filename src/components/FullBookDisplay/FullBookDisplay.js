import React from 'react';
import styles from './FullBookDisplay.module.css';

import { database } from '../firebase/firebase.app';
import axios from 'axios';
import firebase from '../firebase/firebase.app';
import bookImg from '../../resources/book2.jpg';
class FullBookDisplay extends React.Component {
    

    state = {
        mailSent: false
     }

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

    sendEmail = () => {
        // console.log("Lolol")
        database.ref(`users/${this.state.book.sellerId}`).once("value", snapshot => {
            let sellerPhone = 0, user = {}, sellerName = "";
            let currentUser = firebase.auth().currentUser;
            if(snapshot.val()) {
                user = snapshot.val();
                // sellerName = user.displayName;
                sellerPhone = user.phoneNumber;
            }
            
            // let message = "Below are the details of the seller, Please contact to eachother for transaction";
            let urlOne = `https://us-central1-exbook-ac4e3.cloudfunctions.net/sendMail?email=${currentUser.email}&name=${this.state.book.sellerName}&phone=${this.state.book.sellerPhNo}&myType=buy&contactEmail=${this.state.book.sellerEmail}`;
            //let urlOne = "https://us-central1-exbook-ac4e3.cloudfunctions.net/sendMail?email=krunallia18@gmail.com" 
            axios.get(urlOne, {
                params: {
                    message: "Below are the details of the seller, Please contact to eachother for transaction"
                }
            })
            .then(function (response) {
                 console.log(response);
                

            })
            .catch(function (error) {
                console.log(error);
            });
            
            // let urlOne = `https://us-central1-exbook-ac4e3.cloudfunctions.net/sendMail?email=${currentUser.email}&name=${this.state.book.sellerName}&phone=${this.state.book.sellerPhNo}&myType=buy&contactEmail=${this.state.book.sellerEmail}`;
            let urlTwo = "https://us-central1-exbook-ac4e3.cloudfunctions.net/sendMail" 
            axios.get(urlTwo, {
                params: {
                  email: this.state.book.sellerEmail,
                  name: currentUser.displayName,
                  phone: 998163960,
                  contactEmail: currentUser.email,
                  message: "Hey! A user is interested in buying your book on ExBook!! Below are the contact details!"
            }
            })
            .then(function (response) {
                 console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            this.setState({
                mailSent: true
            })
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
                    <h3>Get this Book!</h3>
                    <p>Condition: <span>{this.state.book ? this.state.book.condition : null}</span></p>
                    <p>MRP: <span>{this.state.book ? this.state.book.originalPrice : null}</span></p>
                    <p>Seller Price: <span>{this.state.book ? this.state.book.sellingPrice : null}</span></p>
                   {this.state.mailSent ? "We sent you a mail regarding seller details please check " : <button className={styles.button} onClick={this.sendEmail}>CONTACT SELLER</button> }
                </div>
            </div>
        )
    } 
}

export default FullBookDisplay;