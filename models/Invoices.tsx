import React from 'react';
import {RequestErrorHandler} from '../components/Utils/ErrorHandler';
import * as SecureStore from 'expo-secure-store';
import config from '../config/config.json';
import * as InvoiceInterfaces from '../interfaces/Invoice';
import {NewInvoice} from "../interfaces/Invoice";

/**
 * Getter Model Method for getting all available invoices from the API.
 */
export async function getInvoices(): Promise<InvoiceInterfaces.Invoice[]> {
    try {
        // Get token from SecureStore.
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
            },
        );

        // Await JSON response.
        const result = await response.json();

        console.log('Invoices fetched from API: ', result.data);
        return result.data;
    } catch (error) {
        console.error(error);
        RequestErrorHandler(error);
    }
}

export async function createInvoice(invoice: Partial<NewInvoice>) {
    try {
        const jwtToken = await SecureStore.getItemAsync('token');

        console.log(
            'InvoiceModel.createInvoice() ~> Invoice to be created: ',
            invoice,
        );

        return await fetch(`${config.base_url}/invoices`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': jwtToken,
            },
            body: JSON.stringify({
                order_id: invoice.order_id,
                total_price: invoice.total_price,
                creation_date: invoice.creation_date,
                due_date: invoice.due_date,
                api_key: config.api_key,
            }),
        });
    } catch (error) {
        console.error(error);
        RequestErrorHandler(error);
    }
}

export async function getInvoiceById(
    invoice_id: number,
): Promise<InvoiceInterfaces.Invoice[]> {
    console.log('Get invoice by ID: ', invoice_id);
}
