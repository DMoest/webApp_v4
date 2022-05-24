/**
 * Module imports.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Stock } from '../interfaces/Stock';
import { Deliveries } from '../interfaces/Deliveries';
import { RequestErrorHandler } from '../components/Utils/ErrorHandler';
import config from '../config/config.json';

/**
 * Getter Model Method for getting all avaliable products from the API.
 */
export async function getProducts(): Promise<Stock[]> {
    try {
        const response = await fetch(
            `${config.base_url}/products?api_key=${config.api_key}`,
        );

        const result = await response.json();

        return result.data;
    } catch (error) {
        RequestErrorHandler(error);
    }
}

/**
 * Getter model method to request a specific product by id from API.
 *
 * @param product_id
 */
export async function getProductById(product_id: string): Promise<Stock> {
    try {
        const response = await fetch(
            `${config.base_url}/products/${product_id}?api_key=${config.api_key}`,
        );

        const result = await response.json();

        return result;
    } catch (error) {
        RequestErrorHandler(error);
    }
}

/**
 * Setter Model Method to update a products in API.
 *
 * @param product
 */
export async function updateProduct(product: Partial<Stock>) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Updating product ${product.id} - ${product.name}`);

    try {
        return await fetch(
            `${config.base_url}/products?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: product.id,
                    name: product.name,
                    stock: product.stock,
                    api_key: `${config.api_key}`,
                }),
            },
        );
    } catch (error) {
        RequestErrorHandler(error);
    }
}

/**
 * Setter Model Method to update a product in the API from a delivery.
 *
 * @param product
 * @param delivery
 */
export async function updateProductStockFromDelivery(
    product: Partial<Stock>,
    delivery: Partial<Deliveries>,
) {
    try {
        const newStock = product.stock + delivery.amount;

        return await fetch(
            `${config.base_url}/products?api_key=${config.api_key}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: delivery.product_id,
                    name: delivery.product_name,
                    stock: newStock,
                    api_key: `${config.api_key}`,
                }),
            },
        );
    } catch (error) {
        RequestErrorHandler(error);
    }
}
