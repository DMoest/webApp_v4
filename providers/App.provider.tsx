/**
 * Module imports.
 */
import React, { createContext } from 'react';
import * as ProductsInterfaces from '../interfaces/Products';
import * as OrdersInterfaces from '../interfaces/Orders';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';

/**
 * Application context types.
 */
type AppContextType = {
    products: ProductsInterfaces.Products[];
    setProducts: () => void;
    orders: OrdersInterfaces.Orders[];
    setOrders: () => void;
    deliveries: DeliveriesInterfaces.Deliveries[];
    setDeliveries: () => void;
};

/**
 * App context.
 */
const AppContext = createContext<AppContextType>({
    products: [],
    setProducts: () => [],
    orders: [],
    setOrders: () => [],
    deliveries: [],
    setDeliveries: () => [],
});

/**
 * App context provider.
 *
 * @param children
 * @constructor
 */
export const AppProvider: React.FC = ({ children }) => {
    const [products, setProducts] = React.useState<
        ProductsInterfaces.Products[]
    >([]);
    const [orders, setOrders] = React.useState<OrdersInterfaces.Orders[]>([]);
    const [deliveries, setDeliveries] = React.useState<
        DeliveriesInterfaces.Deliveries[]
    >([]);

    return (
        <AppContext.Provider
            value={{
                products: products,
                setProducts: setProducts,
                orders: orders,
                setOrders: setOrders,
                deliveries: deliveries,
                setDeliveries: setDeliveries,
            }}>
            {children}
        </AppContext.Provider>
    );
};

/**
 * Module exports.
 */
export const useAppContext = () => React.useContext(AppContext);
