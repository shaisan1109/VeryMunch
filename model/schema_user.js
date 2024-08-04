import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
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
            unique: true, // Ensures that each email is unique in the database
            lowercase: true // Optionally convert email to lowercase for consistency
        },
        password: {
            type: String,
            required: true,
            minlength: 8 // Ensure password has at least 8 characters
        }
    },
    phone: {
        type: String,
        default: '' // Make phone optional
    },
    location: {
        street: {
            type: String,
            default: '' // Make street optional
        },
        city: {
            type: String,
            default: '' // Make city optional
        },
        region: {
            type: String,
            default: '' // Make region optional
        },
        province: {
            type: String,
            default: '' // Make province optional
        }
    }
});

const User = model('User', userSchema, 'users');

export default User;
