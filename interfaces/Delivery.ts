/**
 * Delivery interface.
 */
export interface Delivery {
    id: number;
    product_id: string;
    product_name?: string;
    amount: number;
    delivery_date: string;
    comment: string;
    api_key: string;
}

export interface DeliveryItemProps {
    route: {
        params: {
            item: Delivery;
        };
    };
}
