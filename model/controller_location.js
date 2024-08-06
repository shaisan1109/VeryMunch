import Location from './schema_location.js';

// Get all locations from the database
export const getAllLocations = async () => {
    try {
        const locations = await Location.find().lean();
        return locations;
    } catch (error) {
        throw new Error('Error fetching locations');
    }
}

// Get location with region
export const getProvinces = async (region) => {
    try {
        const location = await Location.findOne({ region }, '-_id provinces').lean();
        return location;
    } catch {
        throw new Error('Error fetching provinces');
    }
}

export default { getAllLocations, getProvinces };
