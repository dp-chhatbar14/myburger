import React from 'react';
import Burger from '../../components/Burger/Burger';
import { useHistory } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
}
    from 'mdb-react-ui-kit';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

function WelcomePage() {

    const history = useHistory();
    console.log(history.location.pathname);
    return (
        <MDBContainer fluid>
            <h1 style={{ color: 'brown', fontFamily: 'serif', fontSize: '55px', textShadow: '5px 5px 15px brown', textAlign: 'center' }} >Welcome To Burger Builder</h1>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px', height:"500px" }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                           {history.location.pathname==="/"?<SignIn></SignIn>:<SignUp></SignUp>}
                        </MDBCol>
                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex mt-4 align-items-center' style={{position:"absolute", marginLeft:"550px"}}>
                            <Burger ingredients={{ "bacon": 1, "cheese": 1, "meat": 1, "salad": 1 }} />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default WelcomePage;