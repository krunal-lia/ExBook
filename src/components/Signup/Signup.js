import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner'
import classes from './Signup.module.css';
// import axios from '../../../axios-orders';
import Input from '../UI/Input/Input';
import { Link , withRouter } from 'react-router-dom';
import firebase, { database } from '../firebase/firebase.app';

class Signup extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your phone number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false,
        signupFailed: false
    }

    

    signupHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        
        firebase.auth().createUserWithEmailAndPassword(this.state.orderForm.email.value, this.state.orderForm.password.value).then((u)=>{
        
        }).then((user)=>{
            console.log(user);
            var user = firebase.auth().currentUser;
            
            user.updateProfile({
            displayName: this.state.orderForm.name.value
            }).then(function() {
                console.log("Successful");
            }).catch(function(error) {
               
            });
            console.log("Database hit!")
            let userObj = {
                displayName: this.state.orderForm.name.value,
                phoneNumber: this.state.orderForm.phoneNumber.value
            } 
            console.log(userObj);
            database.ref(`users/${user.uid}`).set(userObj);
            this.setState({loading: false});
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                loading: false,
                signupFailed: error.message
            })
          })
        
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.signupHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SIGNUP</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        console.log(classes);
        return (
            <div className={classes.Signup}>
               <h4>SIGNUP</h4>
                {form}
               {this.state.signupFailed ? <p>{this.state.signupFailed}</p> : <p>Already have a account? <Link className={classes.Link} to="login">Login</Link></p>}
            </div>
        );
    }
}

export default withRouter(Signup);