// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import config from '../config/config.json';
import { Stock } from '../interfaces/Stock';

export async function getProducts(): Promise<Stock[]> {
    const response = await fetch(
        `${config.base_url}/products?api_key=${config.api_key}`,
    );

    const result = await response.json();

    return result.data;
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
