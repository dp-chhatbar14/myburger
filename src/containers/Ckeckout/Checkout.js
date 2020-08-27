import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{

    cancelCheckoutHandler=()=>{
        this.props.history.goBack();
    }

    continueCheckoutHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }  

    render(){
        
        let summary=<Redirect to='/'/>
        if(this.props.ings){
            summary=(
                <div>
                    <CheckoutSummary continue={this.continueCheckoutHandler} cancel={this.cancelCheckoutHandler}ingredients={this.props.ings}/>
                    <Route path={this.props.match.path+'/contact-data'} exact component={ContactData}/>
                </div>
            );
        }
        return summary
    }
}

const mapStateToProps = state => {
    return{
        ings:state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);