import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkout = (props)=>{

    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope it Tastes well!</h1>
            <div style={{width:'100%', margin:'auto'}} >
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
        </div>
    );
}

export default checkout;