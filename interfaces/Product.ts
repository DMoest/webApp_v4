/**
 * Product interface.
 *
 * This interface defines the structure of a product object. Used for type checking on requested data.
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
 * Product create interface.
 *
 * This interface defines the structure of a product object used for creating a new product.
 */
export interface ProductCreate {
    // Required fields.
    api_key: string;
    name: string;

    // Optional fields.
    article_number?: string;
    description?: string;
    specifiers?: string;
    stock?: number;
    location?: string;
    price?: number;
}

/**
 * Product update interface.
 *
 * This interface defines the structure of a product object used for updating an existing product.
 */
export interface ProductUpdate {
    // Required fields.
    id: number;
    name: string;
    api_key: string;

    // Optional fields.
    article_number?: string;
    description?: string;
    specifiers?: string;
    stock?: number;
    location?: string;
    price?: number;
}

/**
 * Product delete interface.
 *
 * This interface defines the structure of a product object used for deleting an existing product.
 */
export interface ProductDelete {
    id: number;
    api_key: string;
}
