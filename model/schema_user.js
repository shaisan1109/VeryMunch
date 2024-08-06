import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    login: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true // Store password in plain text
        }
    },
    phone: {
        type: String,
        required: false // Adjust if needed
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }]
});

const User = mongoose.model('User', userSchema, 'users');
export default User;
