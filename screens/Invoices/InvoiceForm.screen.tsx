import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    Platform,
    Pressable,
    Text,
    View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppContext} from '../../context/App.provider';
import {Picker} from '@react-native-picker/picker';
import {LoadingIndicator} from '../../components/Utils/LoadingIndicator';
import {StatusBar} from 'expo-status-bar';
import * as InvoiceInterfaces from '../../interfaces/Invoice';
import * as InvoiceModel from '../../models/Invoices';
import * as OrderInterfaces from './../../interfaces/Order';
import * as OrderModel from '../../models/Orders';
import * as Style from '../../assets/styles';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';


export const InvoiceForm: React.FC = (): React.ReactElement => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedOrder, setSelectedOrder] =
        useState<OrderInterfaces.Order | null>(
            (appContext.orders.filter(
                (order: OrderInterfaces.Order): boolean => {
                    return order.status_id === 500;
                },
            )[0] as OrderInterfaces.Order) || null,
        );
    const [creationDate, setCreationDate] = useState<Date>(new Date());
    const [showCreationDate, setShowCreationDate] = useState<boolean>(false);
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [showDueDate, setShowDueDate] = useState<boolean>(false);
    const [newInvoiceData, setNewInvoiceData] =
        useState<InvoiceInterfaces.NewInvoice | null>(null);


    /**
     * Calculate the due date for the invoice.
     */
    const getDueDate = (invoice_creation_date: Date = new Date()): Date => {
        return new Date(
            invoice_creation_date.setDate(invoice_creation_date.getDate() + 30),
        );
    };

    useEffect((): void => {
        console.log(`~> Route.name: ${route.name}`);

        if (
            !Array.isArray(appContext.orders) ||
            !appContext.orders.length
        ) {
            try {
                appContext.setIsRefreshing(true);
                OrderModel.getOrders().then(
                    (orders: OrderInterfaces.Order[]): void => {
                        appContext.setOrders(orders);
                    },
                );
            } catch (error) {
                console.error(error);
            } finally {
                appContext.setIsRefreshing(false);
            }
        }
    }, []);


    useEffect((): void => {
        selectedOrder
            ? setNewInvoiceData({
                order_id: selectedOrder.id,
                total_price: OrderModel.calcOrderTotalPrice(selectedOrder),
                creation_date: new Date().toLocaleDateString('se-SV'),
                due_date: getDueDate().toLocaleDateString('se-SV'),
            })
            : null;
    }, [selectedOrder]);


    // Compute the packed orders from the appContext.orders.
    const packedOrders: OrderInterfaces.Order[] = useMemo(() => {
        console.log('Memoizing packedOrders...');
        const currentlyPackedOrders: OrderInterfaces.Order[] =
            appContext.orders.filter(
                (order: OrderInterfaces.Order): boolean =>
                    order.status_id === 200,
            );

        if (
            Array.isArray(currentlyPackedOrders) &&
            currentlyPackedOrders.length > 0
        ) {
            // Set initial values of the selected order...
            setSelectedOrder(currentlyPackedOrders[0]);
        }

        return currentlyPackedOrders;
    }, [appContext.orders]);


    const handleSubmit = async (
        input_invoice: Partial<InvoiceInterfaces.NewInvoice>,
    ): Promise<void> => {
        try {
            console.log(
                `Route: ${route.name} ~> createInvoice(${input_invoice.order_id})`,
            );

            // Create the new invoice.
            await InvoiceModel.createInvoice(input_invoice).then(
                (createdInvoice): void => {
                    console.info(
                        'RESPONSE NEW INVOICE: ',
                        createdInvoice,
                        ' from: ',
                        input_invoice,
                    );
                },
            );

            // Update order status to invoiced.
            await OrderModel.updateOrderStatus(
                input_invoice.order_id,
                selectedOrder.name,
                600,
            );

            // Update the state of the appContext.orders & appContext.packedOrders.
            appContext.setOrders(await OrderModel.getOrders());
        } catch (error) {
            console.error(error);
        } finally {
            console.log('Invoice created...', newInvoiceData);
            navigation.navigate('Fakturor', {reload: true});
        }
    };

    const creationDatePicker: React.FC = (): React.JSX.Element => {
        const showDatePicker = () => {
            setShowCreationDate(true);
        };

        return (
            <View style={Style.Container.grid.row}>
                <Text
                    style={
                        (Style.Form.labelInputField,
                            {width: '33%', alignSelf: 'center'})
                    }>
                    Fakturadatum
                </Text>

                {Platform.OS === 'android' && (
                    <Button
                        onPress={showDatePicker}
                        title='Visa datumväljare'
                    />
                )}
                {(showCreationDate || Platform.OS === 'ios') && (
                    <DateTimePicker
                        onChange={(
                            event: DateTimePickerEvent,
                            date: Date,
                        ): void => {
                            setCreationDate(date);
                            setNewInvoiceData({
                                ...newInvoiceData,
                                creation_date: date.toLocaleString(),
                            });
                            setShowCreationDate(false);
                        }}
                        value={creationDate}
                    />
                )}
            </View>
        );
    };

    /**
     *
     * @param input_date
     * @constructor
     */
    const dueDatePicker: React.FC = (): React.JSX.Element => {
        const showDatePicker = (): void => {
            setShowDueDate(true);
        };

        return (
            <View style={Style.Container.flexBox.row}>
                <Text
                    style={
                        (Style.Form.labelInputField,
                            {width: '33%', alignSelf: 'center'})
                    }>
                    Förfallodatum
                </Text>

                {Platform.OS === 'android' && (
                    <Button
                        onPress={showDatePicker}
                        title='Visa datumväljare'
                    />
                )}
                {(showDueDate || Platform.OS === 'ios') && (
                    <DateTimePicker
                        onChange={(
                            event: DateTimePickerEvent,
                            date: Date | undefined,
                        ) => {
                            if (date) {
                                setDueDate(date);
                                setNewInvoiceData({
                                    ...newInvoiceData,
                                    due_date: date.toLocaleString(),
                                });
                            }
                            setShowDueDate(false);
                        }}
                        value={dueDate}
                    />
                )}
            </View>
        );
    };

    const invoiceOrderPicker: React.FC = (): React.JSX.Element => {
        return (
            <View>
                <Text style={Style.Typography.buttonText}>Välj Order</Text>
                <Picker
                    style={Style.Form.pickers}
                    selectedValue={selectedOrder?.id}
                    onValueChange={(
                        itemValue: number,
                        itemIndex: number,
                    ): void => {
                        const selectedOrder: OrderInterfaces.Order =
                            packedOrders[itemIndex];
                        setSelectedOrder(selectedOrder);
                        setNewInvoiceData({
                            ...newInvoiceData,
                            order_id: itemValue,
                            total_price: OrderModel.calcOrderTotalPrice(selectedOrder),
                        });
                    }}>
                    {packedOrders.map((order: OrderInterfaces.Order) => {
                        return (
                            <Picker.Item
                                key={order.id}
                                label={order.name}
                                value={order.id}
                            />
                        );
                    })}
                </Picker>
            </View>
        );
    };

    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Ordrar'}/>
    ) : !appContext.isRefreshing && packedOrders.length ? (
        <View style={Style.Container.content}>
            <View style={Style.Container.grid.row}>
                {creationDatePicker()}
                {dueDatePicker()}
                <Text style={Style.Container.grid.row}>
                    Fakturabelopp: {newInvoiceData?.total_price} kr
                </Text>
            </View>

            <View style={Style.Container.content}>{invoiceOrderPicker()}</View>

            <Pressable
                style={({pressed}) => [
                    Style.Button.buttonContainer,
                    {
                        backgroundColor: pressed
                            ? Style.Color.schemeOne.primary[200]
                            : Style.Color.schemeOne.primary[300],
                    },
                ]}
                onPress={async () => {
                    // Create the new invoice.
                    await handleSubmit(newInvoiceData);

                    // Navigate back to the invoice list and send params.reload: true.
                    navigation.navigate('Fakturor', {reload: true});
                }}>
                <Text style={Style.Typography.buttonText}>Skapa Faktura</Text>
            </Pressable>

            <StatusBar style='auto'/>
        </View>
    ) : !packedOrders.length ? (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.paragraph}>
                Det finns inga ordrar som är paketerade och redo att
                faktureras.
            </Text>
        </View>
    ) : (
        <View style={Style.Container.content}>
            <LoadingIndicator loadingType={'Ordrar'}/>
        </View>
    );
};
