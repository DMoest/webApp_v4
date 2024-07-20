/**
 * Represents the structure of a product entity within the application.
 * This interface is utilized for type-checking and ensuring consistency in product data handling.
 *
 * @interface Product
 * @property {number} id - Unique identifier for the product.
 * @property {string} article_number - Article number of the product, serving as an additional identifier.
 * @property {string} name - The name of the product.
 * @property {string} description - A brief description of the product.
 * @property {string} specifiers - Detailed specifications or characteristics of the product.
 * @property {number} stock - The quantity of the product available in stock.
 * @property {string} location - The storage location of the product within a warehouse or store.
 * @property {number} price - The selling price of the product.
 * @property {string} api_key - An API key associated with the product for identification or integration
 * purposes.
 */
export interface Product {
    id: number;
    article_number: string;
    name: string;
    description: string;
    specifiers: string;
    stock: number;
    location: string;
    price: number;
    api_key: string;
}


/**
 * Defines the structure for creating a new product within the system.
 * This interface specifies the required and optional fields needed when adding a new product.
 *
 * @interface ProductCreate
 * @property {string} api_key - An API key required for product creation operations.
 * @property {string} name - The name of the new product.
 * @property {string} [article_number] - Optional. Article number of the product.
 * @property {string} [description] - Optional. A brief description of the product.
 * @property {string} [specifiers] - Optional. Detailed specifications or characteristics of the product.
 * @property {number} [stock] - Optional. Initial stock quantity for the product.
 * @property {string} [location] - Optional. Initial storage location of the product.
 * @property {number} [price] - Optional. Selling price of the product.
 */
export interface ProductCreate {
    api_key: string;
    name: string;
    article_number?: string;
    description?: string;
    specifiers?: string;
    stock?: number;
    location?: string;
    price?: number;
}


/**
 * Describes the structure for updating an existing product's information.
 * This interface outlines both the required fields for identifying the product and the optional fields
 * that can be updated.
 *
 * @interface ProductUpdate
 * @property {number} id - The unique identifier of the product to be updated.
 * @property {string} name - The new name of the product.
 * @property {string} api_key - An API key required for product update operations.
 * @property {string} [article_number] - Optional. New or updated article number of the product.
 * @property {string} [description] - Optional. New or updated description of the product.
 * @property {string} [specifiers] - Optional. New or updated specifications or characteristics of the
 * product.
 * @property {number} [stock] - Optional. Updated stock quantity for the product.
 * @property {string} [location] - Optional. New or updated storage location of the product.
 * @property {number} [price] - Optional. New or updated selling price of the product.
 */
export interface ProductUpdate {
    id: number;
    name: string;
    api_key: string;
    article_number?: string;
    description?: string;
    specifiers?: string;
    stock?: number;
    location?: string;
    price?: number;
}


/**
 * Defines the structure for deleting an existing product from the system.
 * This interface requires the minimal information necessary to identify and delete a product.
 *
 * @interface ProductDelete
 * @property {number} id - The unique identifier of the product to be deleted.
 * @property {string} api_key - An API key required for product deletion operations.
 */
export interface ProductDelete {
    id: number;
    api_key: string;
}
