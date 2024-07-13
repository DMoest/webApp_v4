import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';

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
    status_id: number;
    api_key: string;
    image_url: string | null;
    order_items: OrderItem[] | [];
}

/**
 * Order Create interface.
 *
 * This interface is used for creating a new order.
 */
export interface OrderCreate {
    // Required fields.
    name: string;
    api_key: string;

    // Optional fields.
    address?: string;
    zip?: string;
    city?: string;
    country?: string;
    image_url?: string;
    status_id?: number;
}

/**
 * Order Update interface.
 *
 * This interface is used for updating an existing order.
 */
export interface OrderUpdate {
    // Required fields.
    id: number;
    name: string;
    api_key: string;

    // Optional fields.
    address?: string;
    zip?: string;
    city?: string;
    country?: string;
    image_url?: string;
    status_id?: number;
}

/**
 * Order Delete interface.
 *
 * This interface is used for deleting an existing order.
 */
export interface OrderDelete {
    id: number;
    api_key: string;
}

// ------------------------------------------------------------------------------------------------------------------

/**
 * Order Item interface.
 */
export interface OrderItem {
    product_id: number;
    amount: number;
    article_number: string;
    name: string;
    description: string;
    specifiers: string;
    stock: number;
    location: string;
    price: number;
}

/**
 * Order Item Props interface.
 * Used for passing props to OrderItem component.
 */
export interface OrderItemProps {
    route: {
        params: {
            item: Order;
        };
    };
    navigation: NativeStackNavigatorProps;
}

export interface OrderStockIndicatorElement {
    icon: string;
    color: string;
    text: string;
}
