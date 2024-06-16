// eslint-disable-next-line import/no-unresolved
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';

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
    order_items: OrderItem[] | [];
}

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
