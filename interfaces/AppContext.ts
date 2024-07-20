import * as ProductsInterfaces from './Product';
import * as OrdersInterfaces from './Order';
import * as DeliveriesInterfaces from './Delivery';
import * as InvoicesInterfaces from './Invoice';


/**
 * Defines the structure for the application context.
 *
 * This interface outlines the types and functions available for managing the application's global state,
 * including loading indicators, and the state for products, orders, deliveries, and invoices.
 *
 * @interface
 * @property {boolean} isLoading - Indicates if the application is currently loading.
 * @property {Function} setIsLoading - Function to set the loading state.
 * @property {boolean} isRefreshing - Indicates if the application is currently refreshing data.
 * @property {Function} setIsRefreshing - Function to set the refreshing state.
 * @property {ProductsInterfaces.Product[] | null} products - The current list of products or null if not
 * loaded.
 * @property {Function} setProducts - Function to update the list of products.
 * @property {OrdersInterfaces.Order[] | null} orders - The current list of orders or null if not loaded.
 * @property {Function} setOrders - Function to update the list of orders.
 * @property {DeliveriesInterfaces.Delivery[] | null} deliveries - The current list of deliveries or null
 * if not loaded.
 * @property {Function} setDeliveries - Function to update the list of deliveries.
 * @property {InvoicesInterfaces.Invoice[] | null} invoices - The current list of invoices or null if not
 * loaded.
 * @property {Function} setInvoices - Function to update the list of invoices.
 */
export interface AppContext {
    // Loading state
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isRefreshing: boolean;
    setIsRefreshing: (isRefreshing: boolean) => void;

    // Products
    products: ProductsInterfaces.Product[] | null;
    setProducts: (products: ProductsInterfaces.Product[] | null) => void;

    // Orders
    orders: OrdersInterfaces.Order[] | null;
    setOrders: (orders: OrdersInterfaces.Order[] | null) => void;

    // Delivery
    deliveries: DeliveriesInterfaces.Delivery[] | null;
    setDeliveries: (deliveries: DeliveriesInterfaces.Delivery[] | null) => void;

    // Invoices
    invoices: InvoicesInterfaces.Invoice[] | null;
    setInvoices: (invoices: InvoicesInterfaces.Invoice[] | null) => void;
}
