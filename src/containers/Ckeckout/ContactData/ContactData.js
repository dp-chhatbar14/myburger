import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Cookies from 'js-cookie';

class ContactData extends Component {

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
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
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
                value: Cookies.get('email'),
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {

        event.preventDefault();

        this.setState({ loading: true })

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.total,
            orderData: formData
        }

        this.props.onPurchaseBurger(order)
        this.props.history.replace('/builder');
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = { ...this.state.orderForm }
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        console.log(formIsValid)

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })

    }

    checkValidity(value, rules) {

        let isValid = true

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    render() {

        let elementsArray = []
        for (let key in this.state.orderForm) {
            elementsArray.push(
                <Input key={key}
                    elementType={this.state.orderForm[key].elementType}
                    elementConfig={this.state.orderForm[key].elementConfig}
                    value={this.state.orderForm[key].value}
                    invalid={!this.state.orderForm[key].valid}
                    touched={this.state.orderForm[key].touched}
                    shouldValid={this.state.orderForm[key].validation}
                    changed={(event) => this.inputChangedHandler(event, key)} />
            );
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {elementsArray}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        ings: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));