/**
 * Module imports.
 */
import React from "react";
import {Invoice} from "../interfaces/Invoice";
import {RequestErrorHandler} from "../components/Utils/ErrorHandler";
import config from "../config/config.json";
import * as SecureStore from 'expo-secure-store';


/**
 * Getter Model Method for getting all available invoices from the API.
 */
export async function getInvoices(): Promise<Invoice[]> {
    try {
        // Set loading indicator ON.
        // appContext.setIsLoading(true);
        const jwtToken = await SecureStore.getItemAsync('token');

        // Fetch invoices from API.
        const response = await fetch(
            `${config.base_url}/invoices?api_key=${config.api_key}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "x-access-token": jwtToken,
                },
            },
        );

        // Await JSON response.
        const result = await response.json();

        console.log("Invoices fetched from API: ", result.data);

        return result.data;

    } catch (error) {
        console.log(error);
        RequestErrorHandler(error);
    }
}


export async function getInvoiceById(invoice_id: string): Promise<Invoice[]> {
    console.log("Get invoice by ID: ", invoice_id);
}
