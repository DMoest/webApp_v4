// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import config from '../config/config.json';
// eslint-disable-next-line import/no-unresolved
import { Stock } from '../interfaces/Stock';
import { Deliveries } from '../interfaces/Deliveries';

export async function getProducts(): Promise<Stock[]> {
    const response = await fetch(
        `${config.base_url}/products?api_key=${config.api_key}`,
    );

    const result = await response.json();

    return result.data;
}

export async function getProductById(product_id: number): Promise<Stock> {
    const response = await fetch(
        `${config.base_url}/products/${product_id}?api_key=${config.api_key}`,
    );

    const result = await response.json();

    return result;
}

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
        console.log('Update Products Error: ', error);
    }
}

export async function updateProductStockFromDelivery(
    product: Partial<Stock>,
    delivery: Partial<Deliveries>,
) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(
        `Updating product stock for ${product.name} (${product.id}) with ${delivery.amount} pieces from delivery ${delivery.id}`,
    );

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
        console.log('Update Products Error: ', error);
    }
}
