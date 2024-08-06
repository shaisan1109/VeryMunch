import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const locationSchema = new Schema({
    name: String // Location name
});

const Location = model('Location', locationSchema, 'locations');

export default Location;
