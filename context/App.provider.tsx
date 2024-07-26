/**
 * This module defines the application-wide context and provides mechanisms
 * for managing and accessing application state such as loading indicators,
 * products, orders, deliveries, and invoices. It facilitates state management
 * across the application by providing a context provider and a custom hook.
 */
import React, {createContext, useState} from 'react';
import * as AppContextInterfaces from '../interfaces/AppContext';
import * as DeliveriesInterfaces from '../interfaces/Delivery';
import * as OrdersInterfaces from '../interfaces/Order';
import * as ProductsInterfaces from '../interfaces/Product';
import * as InvoicesInterfaces from '../interfaces/Invoice';
import * as UserPositionInterfaces from "../interfaces/UserPosition";


/**
 * `AppContext` is a React context object initialized with default values for
 * application state management, including loading indicators, lists of products,
 * orders, deliveries, and invoices, along with functions to update these states.
 */
const AppContext = createContext<AppContextInterfaces.AppContext>({
    isLoading: false,
    setIsLoading(): void {
    },
    isRefreshing: false,
    setIsRefreshing: (): void => {
    },

    products: [],
    setProducts: () => [],
    orders: [],
    setOrders: () => [],
    deliveries: [],
    setDeliveries: () => [],
    invoices: [],
    setInvoices: () => [],

    userPosition: null,
    setUserPosition: (): void => {
    },
});


/**
 * `AppProvider` is a React functional component that wraps its children with the
 * `AppContext.Provider`, allowing them to access and manipulate the application's
 * state such as loading indicators, products, orders, deliveries, and invoices.
 *
 * @param {React.ReactNode} children - The child components that will have access
 * to the context.
 */
export const AppProvider: React.FC = ({children}) => {
    // User interaction indicators
    const [isLoading, setIsLoading] = useState<
        boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<
        boolean>(false);

    // API Objects
    const [products, setProducts] = useState<
        ProductsInterfaces.Product[] | null
    >(null);
    const [orders, setOrders] = useState<
        OrdersInterfaces.Order[] | null>(null);
    const [deliveries, setDeliveries] = useState<
        DeliveriesInterfaces.Delivery[] | null
    >(null);
    const [invoices, setInvoices] = useState<
        InvoicesInterfaces.Invoice[] | null
    >(null);
    const [userPosition, setUserPosition] = useState<
        UserPositionInterfaces.UserPosition | null>(null);


    return (
        <AppContext.Provider
            value={{
                isLoading,
                setIsLoading,
                isRefreshing,
                setIsRefreshing,

                products,
                setProducts,
                orders,
                setOrders,
                deliveries,
                setDeliveries,
                invoices,
                setInvoices,

                userPosition,
                setUserPosition,
            }}>
            {children}
        </AppContext.Provider>
    );
};


/**
 * `useAppContext` is a custom hook that allows components to access the application
 * context. It returns the context value, providing access to the application's state
 * and functions to manipulate it.
 *
 * @returns {AppContextInterfaces.AppContext} The application context value.
 */
export const useAppContext = (): AppContextInterfaces.AppContext => React.useContext(AppContext);
