/**
 * Invoice Interface.
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
 * New Invoice Interface.
 * Used when creating a new invoice from InvoiceForm.screen.
 */
export interface NewInvoice {
    newInvoice: Partial<Invoice[]>;
    setNewInvoice: () => void;
    setSelectedOrder: () => void;
    order_id: number;
    total_price: number;
    creation_date: Date;
    due_date: Date;
}

/**
 * Invoice Item Props Interface.
 * Used to pass props to InvoiceItem screen/view.
 */
export interface InvoiceItemProps {
    route: {
        params: {
            item: Invoice;
        };
    };
}

export interface UpdateInvoiceProps {
    invoice_id: number;
    invoice_attributes: Partial<Invoice>;
}
