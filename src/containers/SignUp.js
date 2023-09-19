import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Burger from '../components/Burger/Burger';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCardLink,
}
    from 'mdb-react-ui-kit';

function SignUp() {

    const history = useHistory();
    const [state, setState] = useState({

        signUpForm: {
            username: {
                icon: 'user m-3',
                elementId: 'form1',
                elementType: 'text',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                error: 'Invalid input'
            },
            email: {
                icon: 'envelope m-3',
                elementId: 'form2',
                elementType: 'email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                error: 'Invalid input'
            },
            password: {
                icon: 'lock m-3',
                elementId: 'form3',
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false,
                error: 'Invalid Password'
            },
            password2: {
                icon: 'key m-3',
                elementId: 'form4',
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Repeat Your Password'
                },
                value: '',
                validation: {
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false,
                error: 'Invalid Password'
            }
        },
        formIsValid: false,
        loading: false,
        isUserExist: false,
        signedUp: false
    }
    );

    useEffect(() => {
        if (state.signedUp) {
            history.replace('/');
        }
    }, [state.signedUp])

    const signUpHandler = (event) => {

        event.preventDefault();
        setState({ loading: true })
        const formData = { username: state.signUpForm.username.value, email: state.signUpForm.email.value, password: state.signUpForm.password.value };
        try {
            axios.post('/user', { email: state.signUpForm.email.value }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.data.message === "User is Registered") {
                    setState({ ...state, isUserExist: true });
                }
                else {
                    axios.post('/createuser', formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        setState({ ...state, signedUp: true })
                    })
                }
            })
        }
        catch (e) {
            console.log('Unexpected Error');
        }
    }

    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedsignUpForm = { ...state.signUpForm }
        const updatedFormElement = { ...updatedsignUpForm[inputIdentifier] }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedsignUpForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedsignUpForm) {
            formIsValid = updatedsignUpForm[inputIdentifier].valid && formIsValid
        }
        console.log(formIsValid)

        setState({ signUpForm: updatedsignUpForm, formIsValid: formIsValid })

    }

    const checkValidity = (value, rules) => {

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

    let elementsArray = []
    for (let key in state.signUpForm) {
        elementsArray.push(
            <div>
                <div className="d-flex flex-row align-items-center mt-2">
                    <MDBIcon fas icon={state.signUpForm[key].icon} size='lg' />
                    <MDBInput
                        label={state.signUpForm[key].elementConfig.placeholder}
                        id={state.signUpForm[key].elementId}
                        type={state.signUpForm[key].elementType}
                        key={key}
                        elementConfig={state.signUpForm[key].elementConfig}
                        value={state.signUpForm[key].value}
                        invalid={!state.signUpForm[key].valid}
                        touched={state.signUpForm[key].touched}
                        shouldValid={state.signUpForm[key].validation}
                        onChange={(event) => inputChangedHandler(event, key)}
                    />
                </div>
                {!state.signUpForm[key].valid && state.signUpForm[key].touched ? <p className='m-0 text-end small text-danger'>{state.signUpForm[key].error}</p> : <p className='m-0 invisible text-end small text-danger'>{state.signUpForm[key].error}</p>}
            </div>
        )
    }

    return (
        <MDBContainer fluid>
            <h1 style={{ color: 'brown', fontFamily: 'serif', fontSize: '55px', textShadow: '5px 5px 15px brown', textAlign: 'center' }} >Welcome To Burger Builder</h1>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                            {state.isUserExist && <p className='m-3 h6 text-danger'>Email you entered is already Registered</p>}
                            {elementsArray}
                            <div className='mb-4 d-flex align-items-center'>
                                <p className='m-2'>Already a User?</p>
                                <MDBCardLink className='m-0' onClick={() => { history.push('/') }} >SignIn</MDBCardLink>
                            </div>
                            <MDBBtn disabled={!state.formIsValid} onClick={(event) => signUpHandler(event)} className='mb-4' size='lg'>Register</MDBBtn>
                        </MDBCol>
                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex mt-4 align-items-center'>
                            <Burger ingredients={{ "bacon": 1, "cheese": 1, "meat": 1, "salad": 1 }} />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default SignUp;