const updateCartItems = (cartItems, item, idx) => {

    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1),
        ]
    }

    if (idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }
    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1),
    ]
}

const updateCartItem = (book, item = {}, quantity) => {
    const { id = book.id, count = 0, title = book.title, coverImage = book.coverImage, total = 0 } = item;
    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price,
        bookPrice: book.price,
        coverImage,
    }
}

const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems } } = state;

    const book = books.find(({ id }) => id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);
    let newTotal = 0;
    let newCount = 0;

    const cartItemList = updateCartItems(cartItems, newItem, itemIndex)

    cartItemList.forEach(item => newTotal += item.total);
    cartItemList.forEach(item => newCount += item.count);


    return {
        cartItems: updateCartItems(cartItems, newItem, itemIndex),
        orderTotal: newTotal,
        count: newCount
    }
}

const updateShoppingCart = (state, action) => {

    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            count: 0
        }
    }
    switch (action.type) {
        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1);
        case 'BOOK_REMOVED_FROM_CART':
            return updateOrder(state, action.payload, -1);

        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload)
            return updateOrder(state, action.payload, -item.count)
        default:
            return state.shoppingCart;
    }

}

export default updateShoppingCart;