import config from '../config/config.json';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import * as OrderInterfaces from '../interfaces/Order';
import * as ProductModel from './Products';
import { RequestErrorHandler } from '../components/Utils/ErrorHandler';

/**
 * Function to fetch all orders from API.
 * Converts response to JSON data before return.
 */
export async function getOrders(): Promise<OrderInterfaces.Order[]> {
    try {
        const response = await fetch(
            `${config.base_url}/orders?api_key=${config.api_key}`,
        );
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    for (const orderItem of order.order_items) {
        /**
         * Try to update a product stock.
         */
        try {
            const leftOverStock = orderItem.stock - orderItem.amount;
            const productUpdates = {
                api_key: `${config.api_key}`,
                id: orderItem.product_id,
                name: orderItem.name,
                stock: leftOverStock,
            };

            await ProductModel.updateProduct(productUpdates);

            /**
             * Catch any error on product update request
             */
        } catch (error) {
            RequestErrorHandler(error);
        }
    }

    try {
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
    } catch (error) {
        RequestErrorHandler(error);
    }
}
