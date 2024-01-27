if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const TrueOrder = require('../models/order-true')
const IngredientInv = require('../models/inv-ingredient')



module.exports.sendLiveOrders = async (req, res, next) => {
    const since = req.query.since
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const changeStream = TrueOrder.watch({ fullDocument: "updateLookup" });
    changeStream.on("change", async (change) => {
        console.log(change.operationType)
        if (
            (change.operationType === "insert" || change.operationType === "update") &&
            change.fullDocument.prepStatus === 'open' &&
            change.fullDocument.production === true &&
            change.fullDocument.pending === true
        ) {
            const newOrder = await TrueOrder.findOne({ _id: change.fullDocument._id, production: true }).populate({path: 'products.ings.ing', model: 'IngredientInv', select: "name um" });
            res.write(`data: ${JSON.stringify(newOrder)}\n\n`);
        }
    })
    console.log('hit the message')
    const message = { message: 'No Orders' }
    res.write(`data: ${JSON.stringify(message)}\n\n`);
}


module.exports.getOrder = async (req, res, next) => {
    const orders = await TrueOrder.find({ prepStatus: "open", production: true }).populate({path: 'products.ings.ing', model: 'IngredientInv', select: "name um" })
    res.json(orders)
}


module.exports.orderDone = async (req, res, next) => {
    const { cmdId } = req.query
    const doc = await TrueOrder.findByIdAndUpdate(cmdId, { prepStatus: 'done' })
    res.status(200)
}


module.exports.renderTrueOrders = (req, res) => {
    res.render('orders-true/comenzi')
}

module.exports.renderTrueOrdesTerminat = (req, res) => {
    res.render('orders-true/comenzi-terminate')
}


module.exports.getOrderDone = async (req, res, next) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0)
        const orders = await TrueOrder.find({ createdAt: { $gte: currentDate }, prepStatus: 'done', production: true })
        res.status(200).json(orders)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.error.message })
    }
}

