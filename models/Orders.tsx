import config from '../config/config.json';
import React from 'react';
import * as OrderInterfaces from '../interfaces/Order';
import {Order} from '../interfaces/Order';
import { RequestErrorHandler } from '../components/Utils/ErrorHandler';
import * as ProductModel from './Products';

/**
 * Function to fetch all orders from API.
 * Converts response to JSON data before return.
 */
export async function getOrders(): Promise<OrderInterfaces.Order[]> {
    let result = [];

    try {
        // Fetch orders from API.
        const response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );

        // Await JSON response.
        result = await response.json();
    } catch (error) {
        RequestErrorHandler(error);
    } finally {
        if (result.data) {
            return result.data;
        } else {
            return result;
        }
    }
}

export async function getNewOrders(): Promise<OrderInterfaces.Order[]> {
    let result = [];

    try {
        // Fetch orders from API.
        const response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );

        // Await JSON response.
        result = await response.json();

        // Filter orders return by status.
        if (result.data) {
            return result.data.filter(
                (orderItem: Order) =>
                    orderItem.status === 'Ny' && orderItem.status_id === 100,
            );
        } else {
            return result;
        }
    } catch (error) {
        RequestErrorHandler(error);
    }
}

export async function getPackedOrders(): Promise<OrderInterfaces.Order[]> {
    let result = [];

    try {
        // Fetch orders from API.
        const response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );

        // Await JSON response.
        result = await response.json();

        // Filter out all orders that are not packed.
        return result.data.filter(
            (order: OrderInterfaces.Order) =>
                order.status === 'Packad' &&
                order.status_id === 200 &&
                order.order_items.length != 0,
        );
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
                const productUpdates = {
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

        // Update order status.
        await updateOrderStatus(order.id, 200, 'Packad');
    } catch (error) {
        console.error(error);
        RequestErrorHandler(error);
    }
}

export async function updateOrderStatus(
    input_order_id: number | undefined,
    status_id: number,
    status: string,
) {
    try {
        const response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: {
                    id: input_order_id,
                    status_id: status_id,
                    status: status,
                    api_key: `${config.api_key}`,
                },
            },
        );

        console.log(`OrderModel.updateOrderStatus ~> ${response}`);

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
export function calcOrderTotalPrice(order: Partial<Order>): number {
    let total_price = 0;

    console.log(
        `OrderModel ~> calcOrderTotalPrice: order: ${JSON.stringify(order)}`,
    );

    if (order) {
        try {
            order.order_items?.forEach((orderItem) => {
                total_price += orderItem.price * orderItem.amount;
            });
        } catch (error) {
            RequestErrorHandler(error);
        }
    }

    console.log('TOTAL PRICE: ', total_price);

    return total_price;
}

export function checkIfOrderIsPackable(order: OrderInterfaces.Order) {
    let result = false;

    if (order.order_items.length > 0) {
        result = order.order_items.every((orderItem) => {
            return orderItem.stock >= orderItem.amount;
        });
    }

    return result;
}
