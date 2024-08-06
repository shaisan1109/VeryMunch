import User from './schema_user.js';

export const getUser = async (email) => {
	try {
        const user = await User.findOne({ 'login.email': email }).lean();
        return user;
    } catch (error) {
        throw new Error('Error fetching user');
    }
};

// Get specific user with id PLUS reviews
export const getUserWithReviews = async (id) => {
    try {
        const user = await User.findById(id).populate("reviews").lean();
        return user;
    } catch (error) {
        throw new Error('Error fetching restaurant with reviews');
    }
}

export default { getUser, getUserWithReviews };