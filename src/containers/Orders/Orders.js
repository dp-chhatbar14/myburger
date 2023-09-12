import React,{Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as fetchOrdersActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{

    componentDidMount(){
       this.props.onFetchOrdersInit();
    }

    render(){

        let orders=<Spinner/>
        if(!this.props.loading){
            orders= this.props.orders.map(or=>(
                <Order key={or.id} ingredients={or.ingredients} price={or.price.toFixed(2)} />));
            }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders:state.order.orders,
        loading:state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrdersInit:()=>dispatch(fetchOrdersActions.fetchOrdersInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));