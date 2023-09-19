var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var orderController = require('../controllers/orderController')
var userController = require('../controllers/userController')

/* GET home page. */
router.post('/user', bodyParser.json(), userController.getUser)
router.post('/createuser', bodyParser.json(), userController.newUser)
router.post('/orders', bodyParser.json(), orderController.getOrders);
router.post('/createorder', bodyParser.json(), orderController.newOrder)
router.get('/ingredients', orderController.ingredients)

module.exports = router;
