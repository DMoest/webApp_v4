// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import config from '../config/config.json';
import * as OrderInterfaces from '../interfaces/Order';
import * as ProductModel from './Products';

/**
 * Function to fetch all orders from API.
 * Converts response to JSON data before return.
 */
export async function getOrders(): Promise<OrderInterfaces.Order> {
    const response = await fetch(
        `${config.base_url}/orders?api_key=${config.api_key}`,
    );
    const result = await response.json();

    return result.data;
}

/**
 * Function to pick an order.
 * Product stocks are updated with
 * @param order
 */
export async function pickOrder(order: OrderInterfaces.Order) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    for (const orderItem of order.order_items) {
        try {
            const leftOverStock = orderItem.stock - orderItem.amount;
            const productUpdates = {
                api_key: `${config.api_key}`,
                id: orderItem.product_id,
                name: orderItem.name,
                stock: leftOverStock,
            };

            await ProductModel.updateProduct(productUpdates);
        } catch (error) {
            console.log('Pick Order Error: ', error);
        }
    }

    const response = await fetch(
        `${config.base_url}/orders?api_key=${config.api_key}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                api_key: `${config.api_key}`,
                id: order.id,
                name: order.name,
                status_id: 200,
            }),
        },
    );

    return response;
}
