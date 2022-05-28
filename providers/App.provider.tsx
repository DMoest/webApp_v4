/**
 * Module imports.
 */
import React, { createContext } from 'react';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as OrdersInterfaces from '../interfaces/Orders';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as ProductsInterfaces from '../interfaces/Products';

/**
 * Application context types.
 */
type AppContextType = {
    products: ProductsInterfaces.Products[];
    setProducts: (products1: ProductsInterfaces.Product[]) => void;
    orders: OrdersInterfaces.Orders[];
    setOrders: (orders1: OrdersInterfaces.Order[]) => void;
    deliveries: DeliveriesInterfaces.Deliveries[];
    setDeliveries: (deliveries1: DeliveriesInterfaces.Deliveries[]) => void;
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
                products,
                setProducts,
                orders,
                setOrders,
                deliveries,
                setDeliveries,
            }}>
            {children}
        </AppContext.Provider>
    );
};

/**
 * Context access function exported.
 */
export const useAppContext = () => React.useContext(AppContext);
