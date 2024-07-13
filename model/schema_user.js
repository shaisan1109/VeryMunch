import mongoose from 'mongoose';
import { type } from 'os';

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
			required: true
		},
		password: {
			type: String,
			required: true,
			minLength: 8
		}
	},
    phone: {
        type: String,
        // is phone number required?
    },
    location: { // is location required?
        street: { // Unit No. / Street Name (exact address)
            type: String
        },
        city: {
            type: String
        },
        region: {
            type: String
        },
        province: {
            type: String
        }
    }
});

// Last parameter refers to the table being used in the actual DB
const User = model("User", userSchema, 'users');

export default User;