import config from '../config/config.json';
import * as DeliveriesInterfaces from '../interfaces/Delivery';
import {RequestErrorHandler} from '../components/Utils/ErrorHandler';


/**
 * Fetches all deliveries from the API.
 *
 * This function asynchronously retrieves a list of all deliveries from the API
 * and returns them as an array of `Delivery` objects. If the request fails for any reason,
 * it catches the error, handles it using `RequestErrorHandler`, and returns an empty array.
 *
 * @returns {Promise<DeliveriesInterfaces.Delivery[]>} A promise that resolves to an array of
 * `Delivery` objects.
 */
export async function getDeliveries(): Promise<DeliveriesInterfaces.Delivery[]> {
    try {
        const response = await fetch(
            `${config.base_url}/deliveries?api_key=${config.api_key}`,
        );
        const result = await response.json();

        return result.data;
    } catch (error) {
        RequestErrorHandler(error);
    }

    return [];
}


/**
 * Creates a new delivery in the API.
 *
 * This function sends an asynchronous request to create a new delivery in the API.
 * It uses the HTTP POST method to submit the delivery details. If the request is successful,
 * it returns the newly created delivery object. In case of an error, it catches the error
 * and handles it using `RequestErrorHandler`.
 *
 * @param {Partial<DeliveriesInterfaces.Delivery>} delivery - An object containing the new delivery
 * details.
 * @returns {Promise<DeliveriesInterfaces.Delivery>} A promise that resolves to the newly created
 * delivery object.
 */
export async function createDelivery(
    delivery: Partial<DeliveriesInterfaces.Delivery>,
) {
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
