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
 */
export interface NewInvoice {
    newInvoice: Invoice[];
    setNewInvoice: () => void;
    setSelectedOrder: () => void;
    order_id: number;
    total_price: number;
    creation_date: Date;
    due_date: Date;
}
