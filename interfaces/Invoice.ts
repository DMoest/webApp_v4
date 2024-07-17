/**
 * Represents the structure and data of an invoice in the system.
 *
 * @interface Invoice
 * @property {number} id - The unique identifier of the invoice.
 * @property {number} order_id - The identifier of the order associated with this invoice.
 * @property {string} name - The name of the customer or entity associated with the invoice.
 * @property {string} address - The billing address for the invoice.
 * @property {string} zip - The postal code for the billing address.
 * @property {string} city - The city of the billing address.
 * @property {string} country - The country of the billing address.
 * @property {number} total_price - The total price or cost represented by the invoice.
 * @property {Date} creation_date - The date when the invoice was created.
 * @property {Date} due_date - The date by which the invoice should be paid.
 */
export interface Invoice {
    id: number;
    order_id: number;
    name: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    total_price: number;
    creation_date: Date;
    due_date: Date;
}


/**
 * Defines the structure for creating a new invoice, typically used when submitting data from a form.
 *
 * @interface NewInvoice
 * @property {string} api_key - An API key required for authentication to create an invoice.
 * @property {number} order_id - The identifier of the order associated with the new invoice.
 * @property {number} total_price - The total price or cost represented by the new invoice.
 * @property {Date} [creation_date] - Optional. The date when the invoice is created.
 * @property {Date} [due_date] - Optional. The date by which the invoice should be paid.
 */
export interface NewInvoice {
    api_key: string;
    order_id: number;
    total_price: number;
    creation_date?: Date;
    due_date?: Date;
}


/**
 * Describes the structure for updating an existing invoice's information.
 *
 * @interface UpdateInvoice
 * @property {string} api_key - An API key required for authentication to update the invoice.
 * @property {number} id - The unique identifier of the invoice to be updated.
 * @property {number} [order_id] - Optional. The identifier of the order associated with the invoice.
 * @property {Date} [creation_date] - Optional. The date when the invoice was or is to be created.
 * @property {Date} [due_date] - Optional. The date by which the invoice should be paid.
 * @property {number} [total_price] - Optional. The total price or cost represented by the invoice.
 */
export interface UpdateInvoice {
    api_key: string;
    id: number;
    order_id?: number
    creation_date?: Date;
    due_date?: Date
    total_price?: number
}


/**
 * Defines the structure for deleting an existing invoice from the system.
 *
 * @interface DeleteInvoice
 * @property {string} api_key - An API key required for authentication to delete the invoice.
 * @property {number} id - The unique identifier of the invoice to be deleted.
 */
export interface DeleteInvoice {
    api_key: string;
    id: number;
}


/**
 * Used to pass properties to components or screens that display or interact with an invoice item.
 *
 * @interface InvoiceItemProps
 * @property {object} route - The route object containing navigation and parameter information.
 * @property {object} route.params - Parameters passed through the route, including the invoice item.
 * @property {Invoice} route.params.item - The invoice item to be displayed or interacted with.
 */
export interface InvoiceItemProps {
    route: {
        params: {
            item: Invoice;
        };
    };
}


/**
 * Describes the properties for updating an invoice, including the invoice ID and attributes to be updated.
 *
 * @interface UpdateInvoiceProps
 * @property {number} invoice_id - The unique identifier of the invoice to be updated.
 * @property {Partial<Invoice>} invoice_attributes - A partial invoice object containing only the
 * attributes that are to be updated.
 */
export interface UpdateInvoiceProps {
    invoice_id: number;
    invoice_attributes: Partial<Invoice>;
}
