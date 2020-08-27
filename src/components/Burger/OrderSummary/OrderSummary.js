import React,{Component} from 'react';
import Aux from "../../../hoc/Auxiliary/Auxiliary"
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log('OrderSummary will update');
    }

    render(){

        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey=>{
            return(
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span> x{this.props.ingredients[igKey]}
                </li>
            )
        });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with following Ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
            <Button btnType='Success' clicked={this.props.continue}>Checkout</Button>
        </Aux>
        );
    }
}

export default OrderSummary;