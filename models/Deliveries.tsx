import React from 'react';
import config from '../config/config.json';
import DeliveriesInterfaces from '../interfaces/Deliveries';
import { RequestErrorHandler } from '../components/Utils/ErrorHandler';

/**
 * Get all deliveries.
 */
export async function getDeliveries(): Promise<DeliveriesInterfaces.Deliveries[] | void> {
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

/**
 * Create new delivery.
 *
 * @param delivery
 */
export async function createDelivery(
    delivery: Partial<DeliveriesInterfaces.Deliveries>,
): Promise<DeliveriesInterfaces.Deliveries> {
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
