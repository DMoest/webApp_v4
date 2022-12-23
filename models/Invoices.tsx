/**
 * Module imports.
 */
import React from 'react';
import * as InvoiceInterfaces from '../interfaces/Invoice';
import {RequestErrorHandler} from '../components/Utils/ErrorHandler';
import config from '../config/config.json';
import * as SecureStore from 'expo-secure-store';

/**
 * Getter Model Method for getting all available invoices from the API.
 */
export async function getInvoices(): Promise<InvoiceInterfaces.Invoice[]> {
    try {
        // Set loading indicator ON.
        // appContext.setIsLoading(true);
        const jwtToken = await SecureStore.getItemAsync('token');

        // Fetch invoices from API.
        const response = await fetch(
            `${config.base_url}/invoices?api_key=${config.api_key}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'x-access-token': jwtToken,
                },
            }
        );

        // Await JSON response.
        const result = await response.json();

        console.log('Invoices fetched from API: ', result.data);

        return result.data;
    } catch (error) {
        console.log(error);
        RequestErrorHandler(error);
    }
}

export async function createInvoice(
    newInvoiceData: Partial<InvoiceInterfaces.Invoice>
): Promise<InvoiceInterfaces.Invoice[]> {
    try {
        const jwtToken = await SecureStore.getItemAsync('token');
        const response = await fetch(
            `${config.base_url}/invoices?api_key=${config.api_key}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: {
                    api_key: jwtToken,
                    order_id: newInvoiceData.order_id,
                    total_price: newInvoiceData.total_price,
                },
            }
        );
        const result = await response.json();
        console.log('Invoice created: ', result.data);
        return result.data;
    } catch (error) {
        console.warn(error);
        RequestErrorHandler(error);
    }
}

export async function getInvoiceById(
    invoice_id: number
): Promise<InvoiceInterfaces.Invoice[]> {
    console.log('Get invoice by ID: ', invoice_id);
}
