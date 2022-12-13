/**
 * Invoice Interface.
 */
export interface Invoice {
    id: number;
    order_id: number;
    total_price: number;
    creation_date: string;
    due_date: string;
}


/**
 * Invoice Item Interface.
 */
// export interface InvoiceItem {
//     id: number;
//     order_id: number;
//     name: string;
//     address: string;
//     zip: string;
//     city: string;
//     country: string;
//     total_price: number;
//     creation_date: string;
//     due_date: string;
// }
