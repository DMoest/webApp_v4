import config from '../config/config.json';
import {RequestErrorHandler} from '../components/Utils/ErrorHandler';
import * as ProductModel from './Products';
import * as OrderInterfaces from '../interfaces/Order';
import * as ProductInterfaces from '../interfaces/Product';


/**
 * Fetches all orders from the API.
 *
 * This function asynchronously retrieves a list of all orders from the API
 * and returns them as an array of `Order` objects. If the request fails for any reason,
 * it catches the error, handles it using `RequestErrorHandler`, and returns an empty array.
 *
 * @returns {Promise<OrderInterfaces.Order[]>} A promise that resolves to an array of `Order` objects.
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


/**
 * Fetches a specific order by its ID from the API.
 *
 * This function asynchronously requests an order by its unique identifier from the API.
 * If the request is successful, it returns the order data. In case of an error, it catches
 * the error and handles it using `RequestErrorHandler`.
 *
 * @param {number} orderId - The unique identifier of the order to fetch.
 * @returns {Promise<OrderInterfaces.Order | undefined>} A promise that resolves to the order data if
 * successful, or undefined if an error occurs.
 */
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
 * Updates the stock of a product based on an order.
 *
 * This function loops through all items in an order, updating the stock of each product
 * based on the order's requirements. If the stock is insufficient, it throws an error.
 * Errors during the update process are caught and handled by `RequestErrorHandler`.
 *
 * @param {OrderInterfaces.Order} order - The order containing items to update stock for.
 * @returns {Promise<void>} A promise that resolves when all product stocks have been updated.
 */
export async function pickOrder(
    order: OrderInterfaces.Order
): Promise<void> {
    try {
        let leftOverStock: number;

        // Loop through all order items and update stock
        for (const orderItem of order.order_items) {
            try {
                leftOverStock = orderItem.stock - orderItem.amount;

                if (leftOverStock <= 0) {
                    throw new Error('Not enough stock to pick order.');
                }

                const productUpdates: ProductInterfaces.ProductUpdate = {
                    api_key: `${config.api_key}`,
                    id: orderItem.product_id,
                    name: orderItem.name,
                    stock: leftOverStock,
                };

                // Update product stock.
                await ProductModel.updateProduct(productUpdates);

            } catch (error) {
                console.error(error);
                RequestErrorHandler(error);
            }
        }

        // Update Order status
        try {
            await updateOrderStatus(order.id, order.name, 200);
        } catch (error) {
            console.error(error);
            RequestErrorHandler(error);
        }
    } catch (error) {
        console.error(error);
        RequestErrorHandler(error);
    }
}


/**
 * Updates the status of an order in the API.
 *
 * This function sends an asynchronous request to update the status of an order in the API.
 * It uses the HTTP PUT method to submit the updated order status. If the request is successful,
 * it does not return anything. In case of an error, it catches the error and handles it using
 * `RequestErrorHandler`.
 *
 * @param {number} order_id - The unique identifier of the order to update.
 * @param {string} order_name - The name of the order.
 * @param {number} new_status_id - The new status ID to set for the order.
 * @returns {Promise<void>} A promise that resolves when the order status has been updated.
 */
export async function updateOrderStatus(
    order_id: number,
    order_name: string,
    new_status_id: number
): Promise<void> {
    try {
        let requestBody: OrderInterfaces.OrderUpdate = {
            id: order_id,
            name: order_name,
            status_id: new_status_id,
            api_key: `${config.api_key}`,
        }

        await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            },
        );
    } catch (error) {
        console.error(error);
        RequestErrorHandler(error);
    }
}


/**
 * Calculates the total price of an order.
 *
 * This function iterates over all items in an order, calculating the total price by
 * multiplying the price of each item by its quantity. It returns the total price of the order.
 *
 * @param {Partial<OrderInterfaces.Order>} order - The order to calculate the total price for.
 * @returns {number} The total price of the order.
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

    return total_price;
}
