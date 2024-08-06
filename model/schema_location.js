import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const locationSchema = new Schema({
    region: {
        type: String
    },
    shortcut: {
        type: String
    },
    provinces: [{
        type: String
    }]
});

const Location = model('Location', locationSchema, 'regions_ph');

export default Location;
