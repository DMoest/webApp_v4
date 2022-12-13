/**
 * Module imports.
 */
import React, {createContext} from 'react';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';
import * as OrdersInterfaces from '../interfaces/Order';
import * as ProductsInterfaces from '../interfaces/Product';
import * as InvoicesInterfaces from '../interfaces/Invoice';


/**
 * Application context types.
 */
type AppContextType = {
    isLoading: boolean;
    setIsLoading: (isLoading1: boolean) => void;
    products: ProductsInterfaces.Product[];
    setProducts: (products1: ProductsInterfaces.Product[]) => void;
    orders: OrdersInterfaces.Order[];
    setOrders: (orders1: OrdersInterfaces.Order[]) => void;
    deliveries: DeliveriesInterfaces.Deliveries[];
    setDeliveries: (deliveries1: DeliveriesInterfaces.Deliveries[]) => void;
    invoices: InvoicesInterfaces.Invoice[];
    setInvoices: (invoices1: InvoicesInterfaces.Invoice[]) => void;
};


/**
 * App context.
 */
const AppContext = createContext<AppContextType>({
    isLoading: false,
    setIsLoading(isLoading: boolean): void {
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
    const [products, setProducts] = React.useState<ProductsInterfaces.Product[]>([]);
    const [orders, setOrders] = React.useState<OrdersInterfaces.Orders[]>([]);
    const [deliveries, setDeliveries] = React.useState<DeliveriesInterfaces.Deliveries[]>([]);
    const [invoices, setInvoices] = React.useState<InvoicesInterfaces.Invoice[]>([]);

    return (
        <AppContext.Provider value={{
            isLoading,
            setIsLoading,
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
