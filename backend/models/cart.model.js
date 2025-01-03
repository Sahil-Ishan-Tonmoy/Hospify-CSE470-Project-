const mongoose=require('mongoose');

const CartSchema = mongoose.Schema(
    {  
        medicine_name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        user_id: {
            type: Number,
            required: true,
        },
        order_no: {
            type: Number,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Cart= mongoose.model('Cart', CartSchema);

module.exports = Cart;