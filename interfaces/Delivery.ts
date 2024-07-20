/**
 * Represents the structure of a delivery within the application.
 *
 * @interface Delivery
 * @property {number} id - Unique identifier for the delivery.
 * @property {string} product_id - Identifier for the product being delivered.
 * @property {string} [product_name] - Optional name of the product being delivered.
 * @property {number} amount - Quantity of the product being delivered.
 * @property {string} delivery_date - Scheduled date for the delivery.
 * @property {string} comment - Additional comments or instructions for the delivery.
 * @property {string} api_key - API key required for authentication to perform delivery-related operations.
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


/**
 * Used for passing props to the DeliveryItem component, containing delivery details.
 *
 * This interface is specifically designed for use in navigation and component prop passing within a
 * React or React Native application, where the delivery item is passed as a parameter through navigation
 * routes.
 *
 * @interface DeliveryItemProps
 * @property {object} route - Object containing navigation route information.
 * @property {object} route.params - Parameters passed through the navigation route, including the
 * delivery item.
 * @property {Delivery} route.params.item - The delivery item being passed as a parameter.
 */
export interface DeliveryItemProps {
    route: {
        params: {
            item: Delivery;
        };
    };
}
