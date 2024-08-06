import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    restaurant: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    deliveryDate: {
        type: String
    },
    items: [{
        quantity: {
            type: Number
        },
        name: {
            type: String
        }
    }]
});

// Last parameter refers to the table being used in the actual DB
const Order = model("Order", orderSchema, 'orders');

export default Order;