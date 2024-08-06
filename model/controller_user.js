import User from './schema_user.js';

export const getUser = async (email) => {
	try {
        const user = await User.findOne({ 'login.email': email }).lean();
        return user;
    } catch (error) {
        throw new Error('Error fetching user');
    }
};

export default getUser;