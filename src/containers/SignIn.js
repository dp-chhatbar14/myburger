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

function SignIn() {

    const history = useHistory();
    const [state, setState] = useState({ userExist: false, email: "", password: "", signedIn: false })

    useEffect(() => {
        if (state.signedIn) {
            history.replace('/builder');
        }
    }, [state.signedIn])


    const checkUser = async (email, password) => {

        try {
            await axios.post('/user', { email: email, password: password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.data.message === "User does not exists") {
                    setState({ ...state, userExist: true });
                }
                else {
                    setState({ ...state, signedIn: true });
                }
            })
        }
        catch (e) {
            console.log('Unexpected Error');
        }

    }

    const signInHandler = (event) => {

        event.preventDefault();
        checkUser(state.email, state.password);
    }

    const inputChangedHandler = (event, inputIdentifier) => {

        if (inputIdentifier === 'email') {
            setState({ ...state, email: event.target.value })
        }
        else {
            setState({ ...state, password: event.target.value })
        }

    }

    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                            {state.userExist && <p className='m-3 h6 text-danger'>Invalid Email or Password</p>}

                            <div className="d-flex flex-row align-items-center mt-4">
                                <MDBIcon fas icon='envelope m-3' size='lg' />
                                <MDBInput
                                    label='Your Email'
                                    id='form1'
                                    type='email'
                                    value={state.email}
                                    onChange={(event) => inputChangedHandler(event, 'email')}
                                />
                            </div>

                            <div className="d-flex flex-row align-items-center mt-4">
                                <MDBIcon fas icon='key m-3' size='lg' />
                                <MDBInput
                                    label='Your Password'
                                    id='form2'
                                    type='password'
                                    value={state.password}
                                    onChange={(event) => inputChangedHandler(event, 'password')}
                                />
                            </div>

                            <div className='mb-4 d-flex align-items-center'>
                                <p className='m-2'>Not a User?</p>
                                <MDBCardLink className='m-0' onClick={() => { history.push('/signup') }} >SignUp</MDBCardLink>
                            </div>
                            <MDBBtn onClick={(event) => signInHandler(event)} className='mb-4' size='lg'>Sign In</MDBBtn>
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

export default SignIn;