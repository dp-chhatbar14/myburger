import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData,
        check:true
    }
}

export const purchaseBurgerFail=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/createorder',orderData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.orderId,orderData));
            
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error));
        });
    }
}


export const fetchOrdersSuccess = (orders)=>{

    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail = (error)=>{

    return{
        type:actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrdersStart = ()=>{

    return{
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersInit = ()=>{
    return dispatch=>{
        dispatch(fetchOrdersStart())
        axios.get('/orders')
        .then(res=>{
            const fetchOrders=[]
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key].orderDetail,
                    id:res.data[key].orderDetail.orderId
                });
            }
            dispatch(fetchOrdersSuccess(fetchOrders));
        })
        .catch(error=>{
            dispatch(fetchOrdersFail(error));
        });
    }
    
}