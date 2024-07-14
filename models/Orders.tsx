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
export async function pickOrder(order: OrderInterfaces.Order): Promise<void> {
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


export async function updateOrderStatus(order_id: number, order_name: string, new_status_id: number) {
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
