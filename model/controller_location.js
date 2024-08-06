import Location from './schema_location.js';

// Get all locations from the database
export const getAllLocations = async () => {
    try {
        const locations = await Location.find().lean();
        return locations;
    } catch (error) {
        throw new Error('Error fetching locations');
    }
};

export default { getAllLocations };
