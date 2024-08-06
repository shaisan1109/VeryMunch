import CartItem from './schema_viewcart.js';

// Get cart item and retrieve menu item info
export const getCartItemWithInfo = async (id) => {
    try {
        const cartItem = await CartItem.findById(id).populate("menu").lean();
        return cartItem;
    } catch(error) {
        throw new Error('Error fetching cart item');
    }
}

// Edit later to insert menu item id instead
export const addItemToCart = async (req, res) => {
    try {
        const { userId, productName, storeAddress, price, description, imageUrl, quantity } = req.body;
        
        const totalPrice = price * quantity;
        
        const newCartItem = new CartItem({
            userId,
            productName,
            storeAddress,
            price,
            description,
            imageUrl,
            quantity,
            totalPrice
        });

        await newCartItem.save();

        res.status(201).json({ message: 'Item added to cart successfully', cartItem: newCartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

export default { addItemToCart, getCartItemWithInfo };
