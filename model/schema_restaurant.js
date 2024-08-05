import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const restoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    operatingHours: {
        startTime: {
            type: String
        },
        endTime: {
            type: String
        }
    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

// Last parameter refers to the table being used in the actual DB
const Restaurant = model("Restaurant", restoSchema, 'restaurants');

export default Restaurant;