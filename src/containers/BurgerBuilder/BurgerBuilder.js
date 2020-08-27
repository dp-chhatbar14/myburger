import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner  from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index' 

class BurgerBuilder extends Component{

    state ={
        purchasing: false,
    }

    componentDidMount(){
       this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients){

        const sum= Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum+el;
            },0);
        return sum>0;
    }

    purchaseHandler =()=> {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        
        this.props.history.push({
            pathname:'/checkout'
        });
    }


    render(){


        const disabledInfo={
            ...this.props.ings
        }

        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let orderSummary=null;

        let burger = this.props.error? <p>Unable to Load Ingredients</p>:<Spinner/>

        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                <BuilControls 
                    addIngredient={this.props.onIngredientAdded} 
                    removeIngredient={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.total}/>
                </Aux>
            );
            orderSummary=<OrderSummary ingredients={this.props.ings}
            price={this.props.total.toFixed(2)}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}/>

        }

      
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>                
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings:state.burgerBuilder.ingredients,
        total:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{

        onIngredientAdded: (ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
