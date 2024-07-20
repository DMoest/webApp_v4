import {RequestErrorHandler} from '../components/Utils/ErrorHandler';
import * as ProductInterfaces from '../interfaces/Product';
import config from '../config/config.json';


/**
 * Fetches all available products from the API.
 *
 * This function asynchronously retrieves a list of all products available from the API
 * and returns them as an array of `Product` objects. If the request fails for any reason,
 * it catches the error, handles it using `RequestErrorHandler`, and returns an empty array.
 *
 * @returns {Promise<ProductInterfaces.Product[]>} A promise that resolves to an array of `Product` objects.
 */
export async function getProducts(): Promise<ProductInterfaces.Product[]> {
    try {
        const response = await fetch(
            `${config.base_url}/products?api_key=${config.api_key}`,
        );

        const result = await response.json();

        return result.data;
    } catch (error) {
        RequestErrorHandler(error);
        return [];
    }
}


/**
 * Fetches a specific product by its ID from the API.
 *
 * This function asynchronously requests a product by its unique identifier from the API.
 * If the request is successful, it returns the product data. In case of an error, it catches
 * the error and handles it using `RequestErrorHandler`.
 *
 * @param {string} product_id - The unique identifier of the product to fetch.
 * @returns {Promise<any>} A promise that resolves to the product data if successful, or undefined if an
 * error occurs.
 */
export async function getProductById(product_id: string) {
    try {
        const response = await fetch(
            `${config.base_url}/products/${product_id}?api_key=${config.api_key}`,
        );

        const result = await response.json();

        return result;
    } catch (error) {
        RequestErrorHandler(error);
    }
}


/**
 * Updates a product in the API.
 *
 * This function sends an asynchronous request to update a product's details in the API.
 * It uses the HTTP PUT method to submit the updated product information. If the request
 * is successful, it returns the response object. In case of an error, it catches the error
 * and handles it using `RequestErrorHandler`.
 *
 * @param {ProductInterfaces.ProductUpdate} updated_product - An object containing the updated product
 * details.
 * @returns {Promise<Response | undefined>} A promise that resolves to the response object if the request
 * is successful, or undefined if an error occurs.
 */
export async function updateProduct(
    updated_product: ProductInterfaces.ProductUpdate,
): Promise<Response | undefined> {
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
                    id: updated_product.id,
                    name: updated_product.name,
                    stock: updated_product.stock,
                    api_key: `${config.api_key}`,
                }),
            },
        );
    } catch (error) {
        RequestErrorHandler(error);
    }
}
