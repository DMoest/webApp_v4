import {useEffect, useState} from 'react';
import {View} from 'react-native';
import Picker from 'react-native-picker';
import {useAppContext} from '../../context/App.provider';
import * as InvoiceInterfaces from '../../interfaces/Invoice';
import * as OrderInterfaces from '../../interfaces/Order';
import * as OrderModel from '../../models/Orders';


/**
 * Picker Component for Product to add to a new delivery.
 *
 * @constructor
 * @param props
 */
// @ts-ignore
export const InvoiceOrderPicker: (
    props: InvoiceInterfaces.NewInvoice
) => JSX.Element = (props: InvoiceInterfaces.NewInvoice) => {
    const appContext = useAppContext();
    const [packedOrders, setPackedOrders] = useState<OrderInterfaces.Order[]>(
        []
    );
    const [selectedOrder, setSelectedOrder] =
        useState<OrderInterfaces.Order | null>(null);

    let ordersHash: any = {};

    useEffect(() => {
        async function loadOrdersAndFilterThem() {
            // Get all orders from API and store to state.
            appContext.setOrders(await OrderModel.getOrders());

            // Filter orders to only show orders that are packed.
            await setPackedOrders(
                appContext.orders.filter(
                    (order) =>
                        order.status === 'Packad' && order.status_id === '200'
                )
            );

            await setSelectedOrder(packedOrders[0]);

            await console.log('selectedOrder: ', selectedOrder);
        }

        void loadOrdersAndFilterThem();
    }, []);

    // const pickerOrdersList = packedOrders.map(
    //     (order: OrderInterfaces.Order, index: number) => {
    //         ordersHash[order.id] = order;
    //
    //         return <Picker.Item key={}></Picker.Item>
    //     }
    // );

    return (
        // <Text style={Style.Form.labelInputField}>Välj order: </Text>
        // <Picker>{pickerOrdersList}</Picker>
        <Picker>
            <Picker.Item
                key={101}
                label={'Java'}
                value={'java'}
            />
            <Picker.Item
                key={102}
                label={'Java'}
                value={'java'}
            />
        </Picker>
    );
};
