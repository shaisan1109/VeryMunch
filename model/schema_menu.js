import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const menuSchema = new Schema({
    // restaurantId: {
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    allergenInfo: {
        type: String
    }
});

// Last parameter refers to the table being used in the actual DB
const Menu = model("Menu", menuSchema, 'menu');

export default Menu;