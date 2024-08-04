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
    }
});

const User = mongoose.model('User', userSchema);
export default User;
