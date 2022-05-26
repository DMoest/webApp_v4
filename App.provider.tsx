/**
 * Module imports.
 */
import React, { createContext } from 'react';
import * as ProductsInterfaces from '../interfaces/Products';
import * as OrdersInterfaces from '../interfaces/Orders';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';

/**
 *
 */
type AppContextType = {
    products: ProductsInterfaces.Products[];
    setProducts: object;
    orders: OrdersInterfaces.Orders[];
    setOrders: object;
    deliveries: DeliveriesInterfaces.Deliveries[];
    setDeliveries: object;
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

export const useAppContext = () => React.useContext(AppContext);
