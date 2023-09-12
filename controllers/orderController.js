var MyOrdersModel = require('../schemas/myOrdersSchema');

exports.getOrders = async (req, res) => {
    try {

        const result = await MyOrdersModel.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.newOrder = async (req, res) => {
    try {
        const randomId= Math.floor(100000000 + Math.random() * 900000000);
        const orderDetail = {orderDetail:{...req.body,orderId:randomId}};
        const result = await MyOrdersModel.create(orderDetail);
        res.status(201).json({
            orderId: randomId,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.errmsg,
        });
    }
};

exports.ingredients = async (req, res) => {
    try {
        res.status(201).json({"bacon":0,"cheese":0,"meat":0,"salad":0});
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.errmsg,
        });
    }
};

