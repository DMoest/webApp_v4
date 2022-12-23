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
    status: string;
    status_id: string;
    api_key: string;
    order_items: OrderItem[] | [];
}

/**
 * Order Item interface.
 */
export interface OrderItem {
    "product_id": number,
    "amount": number,
    "article_number": string,
    "name": string,
    "description": string,
    "specifiers": string,
    "stock": number,
    "location": string,
    "price": number
}
