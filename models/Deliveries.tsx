import React from 'react';
import config from '../config/config.json';
import Deliveries from '../interfaces/Deliveries';

export async function getDeliveries(): Promise<Deliveries[]> {
    const response = await fetch(
        `${config.base_url}/deliveries?api_key=${config.api_key}`,
    );
    const result = await response.json();

    return result.data;
}

export async function createDelivery(
    delivery: Partial<Deliveries>,
): Promise<Deliveries> {
    try {
        return await fetch(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: delivery.product_id,
                    delivery_date: delivery.delivery_date,
                    amount: delivery.amount,
                    comment: delivery.comment,
                    api_key: `${config.api_key}`,
                }),
            },
        );
    } catch (error) {
        console.log('Create new delivery error: ', error);
    }
}
