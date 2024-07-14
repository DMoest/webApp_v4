/**
 * Module imports.
 */
import React, {createContext} from 'react';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';
import * as OrdersInterfaces from '../interfaces/Order';
import * as ProductsInterfaces from '../interfaces/Product';
import * as InvoicesInterfaces from '../interfaces/Invoice';
import * as AppContextInterfaces from '../interfaces/AppContext';


/**
 * App context.
 */
const AppContext = createContext<AppContextInterfaces.AppContext>({
    isLoading: false,
    setIsLoading(isLoading: boolean): void {
    },
    isRefreshing: false,
    setIsRefreshing: (isRefreshing: boolean): void => {
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
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [products, setProducts] = React.useState<
        ProductsInterfaces.Product[]
    >([]);
    const [orders, setOrders] = React.useState<OrdersInterfaces.Order[]>([]);
    const [packedOrders, setPackedOrders] = React.useState<
        OrdersInterfaces.Order[]
    >([]);
    const [deliveries, setDeliveries] = React.useState<
        DeliveriesInterfaces.Deliveries[]
    >([]);
    const [invoices, setInvoices] = React.useState<
        InvoicesInterfaces.Invoice[]
    >([]);

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
