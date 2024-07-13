import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import config from '../config/config.json';
import * as InvoiceInterfaces from '../interfaces/Invoice';
import {RequestErrorHandler} from '../components/Utils/ErrorHandler';


/**
 * Fetches all invoices from the API.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a GET request to the API.
 * The request fetches all invoices and logs the response data. If an error occurs during the request, it is caught,
 * logged, and passed to the RequestErrorHandler function. In the case of an error, the function returns an empty
 * array.
 *
 * @returns {Promise<InvoiceInterfaces.Invoice[]>} The response data from the API, which contains the invoices, or
 * an empty array if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught, logged, and passed to the
 * RequestErrorHandler function.
 */
export async function getInvoices() {
    try {
        console.log('getInvoices()');

        const jwtToken: string | null = await SecureStore.getItemAsync('token');
        const response = await axios.get(
            `${config.base_url}/invoices?api_key=${config.api_key}`,
            {
                headers: {
                    Accept: 'application/json',
                    'x-access-token': jwtToken,
                    'Content-Type': 'application/json',
                },
                timeout: 3000,
            },
        );

        if (response.data.data) {
            return response.data;
        }

        return response;
    } catch (error) {
        RequestErrorHandler(error);
        return [];
    }
}

/**
 * Fetches a specific invoice from the API by its ID.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a GET request to the API.
 * The request fetches a specific invoice by its ID and returns the response data. If an error occurs during the request, it is caught,
 * logged, and passed to the RequestErrorHandler function. In the case of an error, the function returns null.
 *
 * @param {number} invoice_id - The ID of the invoice to fetch.
 * @returns {Promise<InvoiceInterfaces.Invoice | null>} The response data from the API, which contains the invoice, or null if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught, logged, and passed to the RequestErrorHandler function.
 */
export async function getInvoiceById(
    invoice_id: number,
): Promise<InvoiceInterfaces.Invoice | null> {
    try {
        const jwtToken = await SecureStore.getItemAsync('token');
        const response = await axios.get(
            `${config.base_url}/invoices/${invoice_id}?api_key=${config.api_key}`,
            {
                headers: {
                    Accept: 'application/json',
                    'x-access-token': jwtToken,
                },
                timeout: 3000,
            },
        );

        return response.data;
    } catch (error) {
        RequestErrorHandler(error);
        return null;
    }
}

/**
 * Creates a new invoice in the API.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a POST request to the API.
 * The request creates a new invoice with the provided invoice details and returns the response data. If an error
 * occurs during the request, it is caught, logged, and passed to the RequestErrorHandler function. In the case of
 * an error, the function returns null.
 *
 * @param {Partial<InvoiceInterfaces.NewInvoice>} invoice - The details of the invoice to create.
 * @returns {Promise<InvoiceInterfaces.Invoice | null>} The response data from the API, which contains the created
 *  invoice, or null if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught, logged, and passed to the
 *  RequestErrorHandler function.
 */
export async function createInvoice(
    invoice: Partial<InvoiceInterfaces.NewInvoice>,
): Promise<InvoiceInterfaces.Invoice | null> {
    try {
        const jwtToken: string | null = await SecureStore.getItemAsync('token');
        const response: AxiosResponse<InvoiceInterfaces.Invoice> =
            await axios.post(
                `${config.base_url}/invoices`,
                {
                    order_id: invoice.order_id,
                    total_price: invoice.total_price,
                    creation_date: invoice.creation_date,
                    due_date: invoice.due_date,
                    api_key: config.api_key,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': jwtToken,
                    },
                    timeout: 3000,
                },
            );

        return response.data;
    } catch (error) {
        RequestErrorHandler(error);
        return null;
    }
}

/**
 * Updates an existing invoice in the API.
 *
 * This function retrieves a JWT token from SecureStore and uses it to authenticate a PUT request to the API.
 * The request updates an existing invoice with the provided invoice details and returns the status of the response.
 * If an error occurs during the request, it is caught, logged, and passed to the RequestErrorHandler function.
 * In the case of an error, the function returns null.
 *
 * @param {Partial<InvoiceInterfaces.Invoice>} updated_invoice - The updated details of the invoice.
 * @returns {Promise<number | null>} The status of the response from the API, or null if an error occurs.
 * @throws {Error} If there is an error during the request, it is caught, logged, and passed to the
 * RequestErrorHandler function.
 */
export async function updateInvoice(
    updated_invoice: Partial<InvoiceInterfaces.Invoice>,
): Promise<number | null> {
    try {
        const jwtToken: string | null = await SecureStore.getItemAsync('token');
        const response: AxiosResponse = await axios.put(
            `${config.base_url}/invoices/${updated_invoice.id}`,
            {
                ...updated_invoice,
                api_key: config.api_key,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': jwtToken,
                },
                timeout: 3000,
            },
        );

        return response.status;
    } catch (error) {
        RequestErrorHandler(error);
        return null;
    }
}
