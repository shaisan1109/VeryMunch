import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema, 'cartitems');
export default CartItem;