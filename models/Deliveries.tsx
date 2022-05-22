import React from 'react';
import config from '../config/config.json';
import Deliveries from '../interfaces/Deliveries';
import { RequestErrorHandler } from '../components/Utils/ErrorHandler';

export async function getDeliveries(): Promise<Deliveries[]> {
    try {
        const response = await fetch(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
        );
        const result = await response.json();

        return result.data;
    } catch (error) {
        RequestErrorHandler(error);
    }
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
        RequestErrorHandler(error);
    }
}
