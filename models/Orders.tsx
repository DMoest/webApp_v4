import config from '../config/config.json';
import {RequestErrorHandler} from '../components/Utils/ErrorHandler';
import * as ProductModel from './Products';
import * as OrderInterfaces from '../interfaces/Order';
import * as ProductInterfaces from '../interfaces/Product';


/**
 * Function to fetch all orders from API.
 * Converts response to JSON data before return.
 */
export const getOrders = async (): Promise<OrderInterfaces.Order[]> => {
    try {
        // Fetch orders from API.
        const response: Response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );

        // Await JSON response.
        const result = await response.json();

        return result.data;
    } catch (error) {
        RequestErrorHandler(error);
    }

    return [];
};

export const getOrderById = async (orderId: number): Promise<OrderInterfaces.Order | undefined> => {
    try {
        // Fetch orders from API.
        const response: Response = await fetch(
            `${config.base_url}/orders/${orderId}?api_key=${config.api_key}`,
        );

        // Await JSON response.
        const result = await response.json();

        return result.data;
    } catch (error) {
        RequestErrorHandler(error);
    }
}


/**
 * Function to pick an order.
 * Loop through all products and try/catch update product with request call to API.
 * Any error on request call is caught and handled by RequestErrorHandler function.
 *
 * @param order
 */
export async function pickOrder(order: OrderInterfaces.Order) {
    try {
        console.log('OrderModel.pickOrder() -> order.id: ', order.id);
        let leftOverStock: number;

        for (const orderItem of order.order_items) {
            try {
                leftOverStock = orderItem.stock - orderItem.amount;
                console.log('Left over stock: ', leftOverStock);

                const productUpdates: ProductInterfaces.Product = {
                    api_key: `${config.api_key}`,
                    id: orderItem.product_id,
                    name: orderItem.name,
                    stock: leftOverStock,
                };
                console.log('Product updates: ', productUpdates);

                // Update product stock.
                await ProductModel.updateProduct(productUpdates).then(
                    (response: Response | undefined): void => {
                        console.log(
                            'ProductModel.updateProduct -> Response: ',
                            response,
                        );
                    },
                );
            } catch (error) {
                console.error(error);
                RequestErrorHandler(error);
            }
        }

        console.log('Order.id: ', order.id);

        // Update order status.
        return updateOrderStatus(order.id, 200);
    } catch (error) {
        console.error(error);
        RequestErrorHandler(error);
    }
}

export async function updateOrderStatus(order_id: number, status_id: number) {
    try {
        const response: Response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: {
                    id: order_id,
                    status_id: status_id,
                    api_key: `${config.api_key}`,
                },
            },
        );

        return response.json();
    } catch (error) {
        console.error(error);
        RequestErrorHandler(error);
    }
}

/**
 * Function to calculate the total price of an order.
 * It loops through all order items and calculates the total price.
 *
 * @param order
 */
export function calcOrderTotalPrice(
    order: Partial<OrderInterfaces.Order>,
): number {
    let total_price: number = 0;

    if (order && order.order_items?.length) {
        try {
            order.order_items?.forEach(
                (orderItem: OrderInterfaces.OrderItem): void => {
                    orderItem.amount > 0 && orderItem.price > 0
                        ? (total_price += orderItem.price * orderItem.amount)
                        : null;
                },
            );
        } catch (error) {
            RequestErrorHandler(error);
        }
    }

    console.log('Calculated total price for order: ', total_price);
    return total_price;
}
