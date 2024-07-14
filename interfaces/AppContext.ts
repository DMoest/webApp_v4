import * as ProductsInterfaces from './products';
import * as OrdersInterfaces from './orders';
import * as DeliveriesInterfaces from './deliveries';
import * as InvoicesInterfaces from './invoices';


/**
 * Application context types.
 */
export interface AppContext {
    // Loading state
    isLoading: boolean;
    setIsLoading: (isLoading1: boolean) => void;
    isRefreshing: boolean;
    setIsRefreshing: (isRefreshing1: boolean) => void;

    // Products
    products: ProductsInterfaces.Product[];
    setProducts: (products1: ProductsInterfaces.Product[] | void) => void;

    // Orders
    orders: OrdersInterfaces.Order[];
    setOrders: (orders1: OrdersInterfaces.Order[]) => void;

    // Deliveries
    deliveries: DeliveriesInterfaces.Deliveries[];
    setDeliveries: (deliveries1: DeliveriesInterfaces.Deliveries[] | void) => void;

    // Invoices
    invoices: InvoicesInterfaces.Invoice[];
    setInvoices: (invoices1: InvoicesInterfaces.Invoice[]) => void;
}
