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
        throw new Error('Error fetching user with reviews');
    }
}

// Get user with cart items
export const getUserWithCart = async (id) => {
    try {
        const user = await User
            .findById(id)
            .populate({
                path : 'cart',
                populate : {
                  path : 'menu'
                }
              })
            .lean();
        return user;
    } catch {
        throw new Error('Error fetching user with cart');
    }
}

// Get user with past orders
export const getUserWithOrders = async (id) => {
    try {
        const user = await User.findById(id)
            .select("orders -_id")
            .populate({
                path : 'orders',
                populate : {
                  path : 'restaurant'
                }
              })
            .lean();
        return user;
    } catch {
        throw new Error('Error fetching user with orders');
    }
}

export default { getUser, getUserWithReviews, getUserWithCart, getUserWithOrders };