import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner'
import classes from './Sell.module.css';
// import axios from '../../../axios-orders';
import Input from '../UI/Input/Input';
import { withRouter } from 'react-router-dom';
import { database  } from '../firebase/firebase.app';

class Signup extends Component {
    state = {
        orderForm: {
            bookName: {
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
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter description'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            isbn: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter ISBN'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            condition: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'good', displayValue: 'Condition: Good'},
                        {value: 'Bad', displayValue: 'Condition: Bad'},
                        {value: 'average', displayValue: 'Condition: Average'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            originalPrice: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter MRP of Book'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            sellingPrice: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter selling price'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        database.ref(`books`).once("value", snapshot => {


            if(snapshot.val()) {
                let books =  snapshot.val()
                let book = {
                    "bookName": this.state.orderForm.bookName.value,
                    "sellingPrice": this.state.orderForm.sellingPrice.value,
                    "originalPrice": this.state.orderForm.originalPrice.value,
                    "condition": this.state.orderForm.condition.value,
                    "description": this.state.orderForm.description.value,
                    "isbn": this.state.orderForm.isbn.value
                }
                books.unshift(book);
                database.ref(`books`).set(books);
                this.props.history.push("/");
            }
        });    
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
            const pattern = /[a-z0-9!#$%&'*+    /=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
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
            <form onSubmit={this.orderHandler}>
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        console.log(classes);
        return (
            <div className={classes.Signup}>
                <h4>Sell your unused book</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(Signup);