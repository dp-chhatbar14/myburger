import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import HeaderNode from '../Header/header';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as fetchOrdersActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrdersInit();
    }

    render() {

        let orders = <Spinner />
        if (!this.props.loading) {
            if (this.props.orders.length !== 0) {
                orders = this.props.orders.map(or => (
                    <Order key={or.id} ingredients={or.ingredients} price={or.price.toFixed(2)} />));
            } else {
                orders = <h3 style={{ textAlign: 'center' }}>No Orders Yet</h3>
            }

        }
        return (
            <div>
                <HeaderNode></HeaderNode>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrdersInit: () => dispatch(fetchOrdersActions.fetchOrdersInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));