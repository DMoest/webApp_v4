/**
 * Order interface.
 */
export interface Order {
    id: number;
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    status_id: string;
    api_key: string;
    order_items?: object;
}

/**
 * Order Item interface.
 */
export interface OrderItem {
    product_id: number;
    name: string;
    amount: number;
    stock: number;
    article_number: string;
    location: string;
}
