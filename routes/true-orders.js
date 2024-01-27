const express = require('express');
const router = express.Router();
const apiRoutes = require('../controlers/true-orders')


router.route('/recive-order').get(apiRoutes.sendLiveOrders)
router.route('/get-order').get(apiRoutes.getOrder)
router.route('/order-done').get(apiRoutes.orderDone)
router.route('/order-page').get(apiRoutes.renderTrueOrders)
router.route('/finish-order-page').get(apiRoutes.renderTrueOrdesTerminat)
router.route('/get-order-done').get(apiRoutes.getOrderDone)



module.exports = router