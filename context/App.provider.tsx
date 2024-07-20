/**
 * Module imports.
 */
import React, {createContext, useState} from 'react';
import * as AppContextInterfaces from '../interfaces/AppContext';
import * as DeliveriesInterfaces from '../interfaces/Delivery';
import * as OrdersInterfaces from '../interfaces/Order';
import * as ProductsInterfaces from '../interfaces/Product';
import * as InvoicesInterfaces from '../interfaces/Invoice';


/**
 * App context.
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
});


/**
 * App context provider.
 *
 * @param children
 * @constructor
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
            }}>
            {children}
        </AppContext.Provider>
    );
};


/**
 * Context access function exported.
 */
export const useAppContext = () => React.useContext(AppContext);
