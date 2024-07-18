import User from './schema_user.js';

export const getUser = async (email) => {
	const user = await User.findOne({ 'login.email': email }).lean();
	return user;
};

export default getUser;