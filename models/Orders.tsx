import React from 'react';
import config from '../config/config.json';
import { Order } from '../interfaces/Order';
import * as ProductModel from './Products';

/**
 * Function to fetch all orders from API.
 * Converts response to JSON data before return.
 */
export async function getOrders(): Promise<Order[]> {
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
export async function pickOrder(order) {
    // console.log("orderItems: ", order);

    await order.forEach((orderItem, index) => {
        console.log(
            'Updating stockItem: ',
            orderItem.name,
            ' ',
            orderItem.article_number,
        );

        const leftOverStock = item.stock - item.amount;
        const productUpdates = {
            api_key: `${config.api_key}`,
            id: item.product_id,
            name: item.name,
            stock: leftOverStock,
        };

        ProductModel.updateProduct(productUpdates);

        console.log(
            `Produkten ${item.name} har uppdaterats till lagersaldo ${item.amount} `,
        );
    });

    // let response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`, {
    //     method: 'PUT',
    //     headers: {
    //         Accept: 'application/json',
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "api_key": `${config.api_key}`,
    //         "id": order.id,
    //         "name": order.name,
    //         "status_id": 200,
    //     })
    // });
    //
    // let result = await response.json();
    //
    // console.log("JSON RESPONSE: \n", result);
    //
    // return result;
}
