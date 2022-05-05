import React from 'react';
import config from '../config/config.json';
import Stock from '../interfaces/Stock';

export async function getProducts(): Promise<Stock[]> {
    const response = await fetch(
        `${config.base_url}/products?api_key=${config.api_key}`,
    );
    const result = await response.json();

    return result.data;
}

export async function updateProduct(product: Partial<Stock[]>) {
    await fetch(`${config.base_url}/products?api_key=${config.api_key}`, {
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
    });
}
