
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderTrueSchema = new Schema({
    index: {
        type: Number,
        index: true
    },
    name: {
        type: String,
        default: 'COMANDA'
    },
    masaRest: {
        type: Schema.Types.ObjectId,
        ref: 'Table'
    },
    production: Boolean,
    masa: {
        type: Number
    },
    productCount: {
        type: Number,
        required: true
    },
    tips: {
        type: Number,
        default: 0
    },
    pending: {
        type: Boolean,
        default: true
    },
    totalProducts: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "open",
    },
    prepStatus: {
        type: String,
        default: 'open'
    },
    toGo: {
        type: Boolean,
        default: false
    },
    pickUp: {
        type: Boolean,
        default: false
    },
    completetime: {
        type: Number,
        default: 0
    },
    endTime: {
        type: String
    },
    cashBack: {
        type: Number,
        default: 0
    },
    payOnSite: {
        type: Boolean,
        default: false
    },
    onlineOrder: {
        type: Boolean,
    },
    preOrder: {
        type: Boolean,
        default: false
    },
    preOrderPickUpDate: {
        type: String,
    },
    payOnline: {
        type: Boolean,
        default: false
    },
    paymentMethod: String,
    payment: {
        cash: Number,
        card: Number,
        viva: Number,
        voucher: Number,
        online: Number,
    },
    cif: String,
    clientInfo: {
        name: String,
        email: String,
        telephone: String,
        userId: String,
        cashBack: Number,
        discount: {
            general: Number,
            category: [
                {
                    precent: Number,
                    cat: String,
                    name: String,
                }
            ]
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    locatie: {
        type: Schema.Types.ObjectId,
        ref: 'Locatie'
    },
    employee:{
      fullName: String,
      position: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    },
    products:
        [
            {
                name: {
                    type: String,
                    required: true
                },
                category: String,
                printer: {
                    type: String, 
                    default: 'main'
                },
                sentToPrint: {
                    type: Boolean,
                },
                sentToPrintOnline: {
                    type: Boolean,
                    default: true
                },
                discount: Number,
                mainCat: String,
                imgPath: String,
                payToGo: Boolean,
                dep: String,
                sub: Boolean,
                qty: String,
                quantity: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                total: {
                    type: String,
                    required: true
                },
                imgUrl: {
                    type: String,
                    default: 'https://res.cloudinary.com/dhetxk68c/image/upload/v1692369756/True/no_image_patrat_pt8iod.png'
                },
                toppings: [
                    {
                        name: String,
                        price: Number,
                        qty: Number,
                        um: String,
                        ingPrice: Number,
                        ing: {
                            type: Schema.Types.ObjectId,
                            ref: 'IngredientInv'
                        }
                    }
                ],
                ings: [
                    {
                        qty: {
                          type: Number,
                        },
                        ing: {
                            type: Schema.Types.ObjectId,
                            ref: 'IngredientInv'
                        }
                      },
                ],
                comment: String,
                tva: Number,
            }
        ]


}, { timestamps: true, })


module.exports = mongoose.model('Order', orderTrueSchema)