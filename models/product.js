
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const productTrueSchema = new Schema({
    name: String,
    image:
    {
        path: {
            type: String,
            default: 'https://res.cloudinary.com/dhetxk68c/image/upload/v1692369732/True/no_image_dreptunghi_ktwclc.png'
        },
        filename: {
            type: String,
            default: 'no_image_dreptunghi_ktwclc'
        },
    },
    order: {
        type: Number,
        required: true
    },
    printer: {
        type: String,
        default: 'barista'
    },
    toppings:[
            {
                name: String,
                price: Number,
                um: String,
                ingPrice: Number,
                qty: Number,
                ing: {
                    type: Schema.Types.ObjectId,
                    ref: "IngredientInv"
                    }
            }
            
    ],
    price: Number,
    description: String,
    longDescription: String,
    tva: Number,
    subId: String,
    dep: String,
    preOrder: Boolean,
    preOrderPrice: Number,
    paring: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    ings: [
        {
       
          qty: {
            type: Number,
          },
          ing: {
            type: Schema.Types.ObjectId,
            ref: "IngredientInv"
          }
    
        },
      ],
    ingredients: [       
        {
            quantity: {
                type: Number,
                required: true
            },
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: 'Ingredient'
            }
        }
    ],
    allergens: [
        {
            name: String
        }
    ],
    additives: [
        {
            name: String
        }
    ],
    nutrition: {
        energy: {
            kJ: {
                type: Number,
                default: 0
            },
            kcal:  {
                type: Number,
                default: 0
            },
        },
        fat: {
            all:  {
                type: Number,
                default: 0
            },
            satAcids: {
                type: Number,
                default: 0
            },
        },
        carbs: {
            all: {
                type: Number,
                default: 0
            },
            sugar: {
                type: Number,
                default: 0
            },
        },
        salts:  {
            type: Number,
            default: 0
        },
        protein:  {
            type: Number,
            default: 0
        },
    },
    qty: {
        type: String,
    },
    tva: Number,
    dep: String,
    quantity: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    total: {
        type: Number,
    },
    mainCat: String,
    discount: {
        type: Number,
        default: 0
    },
    category:
    {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    locatie: {
        type: Schema.Types.ObjectId,
        ref: 'Locatie'
    },
    subProducts:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'SubProduct'
            }
        ]

})



module.exports = mongoose.model('Product', productTrueSchema)