import OrdersRepository from '../repositories/orders.repository.js';
import UsersRepository from '../repositories/users.repository.js';

const ordersRepository = OrdersRepository();
const usersRepository = UsersRepository();

const createOrder = async (user, business, products) => {
    const currentProducts = business.products.filter((product) => products.includes(product.id));
    const totalPrice = currentProducts.reduce((acc, prev) => {
        acc += prev.price;
        return acc;
    }, 0);
    const orderNumber = Date.now() + Math.floor(Math.random() * 100000 + 1);
    const order = {
        number: orderNumber,
        business: business._id,
        status: 'PENDING',
        products: currentProducts.map((product) => product.id),
        total_price: totalPrice
    };
    const orderResult = await ordersRepository.createOrder(order);
    user.orders.push(orderResult._id);
    await usersRepository.updateUser(user._id, user);
    return orderResult;
};

const getOrders = async () => {
    const result = await ordersRepository.getOrders();
    return result;
};

const getOrderById = async (id) => {
    const result = await ordersRepository.getOrderById(id);
    return result;
};

const resolveOrder = async (order, status) => {
    order.status = status;
    await ordersRepository.resolveOrder(order);
    return result;
}

export {
    createOrder,
    getOrders,
    getOrderById,
    resolveOrder
};