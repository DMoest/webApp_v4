import {RequestErrorHandler} from '../components/Utils/ErrorHandler';
import * as ProductInterfaces from '../interfaces/Product';
import config from '../config/config.json';


/**
 * Getter Model Method for getting all available products from the API.
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
 * Getter model method to request a specific product by id from API.
 *
 * @param product_id
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
 * Setter Model Method to update a products in API.
 *
 * @param updated_product
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
