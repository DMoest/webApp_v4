import React, {useEffect, useMemo, useState} from 'react';
import {
    Alert,
    Button,
    Platform,
    Pressable,
    Text,
    TouchableOpacity,
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


export const InvoiceForm: React.FC = (): React.JSX.Element => {
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
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [showCreationDate, setShowCreationDate] = useState<boolean>(false);
    const [showDueDate, setShowDueDate] = useState<boolean>(false);

    // Props for creating a new invoice.
    const [newInvoice, setNewInvoice] =
        useState<InvoiceInterfaces.NewInvoice | null>(null);

    /**
     * Calculate the due date for the invoice.
     */
    const getDueDate = (invoice_creation_date: Date = new Date()): Date => {
        return new Date(
            invoice_creation_date.setDate(invoice_creation_date.getDate() + 30),
        );
    };

    useEffect(() => {
        console.log(`~> Route.name: ${route.name}`);
        if (
            !Array.isArray(appContext.orders) ||
            appContext.orders.length === 0
        ) {
            appContext.setIsRefreshing(true);
            OrderModel.getOrders().then(
                (orders: OrderInterfaces.Order[]): void => {
                    appContext.setOrders(orders);
                    appContext.setIsRefreshing(false);
                    console.log('DONE: OrderModel.getOrders()');
                },
            );
        }
    }, []);

    async function getPackedOrders() {
        console.log(`Route: ${route.name} ~> getPackedOrders()`);
        appContext.setIsRefreshing(true);

        try {
            // Get all orders.
            appContext.setOrders(await OrderModel.getOrders());
            // appContext.setInvoices(await InvoiceModel.getInvoices());

            const thesePackedOrders = appContext.orders.filter(
                (order: OrderInterfaces.Order) => order.status === 'Packad',
            );

            // Get all packed orders.
            await setPackedOrders(thesePackedOrders);

            console.log(
                `Route: ${route.name} ~> getPackedOrders() ~> thesePackedOrders: ${thesePackedOrders}`,
            );

            if (packedOrders.length > 0) {
                console.log(
                    `IF: InviceForm.packedOrders...length: ${packedOrders.length}`,
                );
                // Set initial values of the new Invoice.
                initInvoiceValues = {
                    order_id: packedOrders[0].id,
                    creation_date: new Date().toLocaleDateString('se-SV'),
                    due_date: getDueDate().toLocaleDateString('se-SV'),
                    total_price: calculateTotalPrice(),
                };

                // Set the selected order in the picker.
                await setSelectedOrder(packedOrders[0]);

                // Set the initial values of the new invoice.
                await setNewInvoice(initInvoiceValues);
            }
        } catch (error) {
            console.error(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    }

    function calculateTotalPrice(): number {
        console.log(`Route: ${route.name} ~> calculateTotalPrice()`);
        let totalPrice = 0;

        if (selectedOrder) {
            selectedOrder.order_items.forEach(
                (orderItem: OrderInterfaces.OrderItem) => {
                    totalPrice += orderItem.price * orderItem.amount;
                },
            );
        }

        console.log(`selectedOrder.order_items.totalPrice: ${totalPrice}`);

        return totalPrice;
    }

    /**
     * Calculate the due date for the invoice.
     */
    function getDueDate(): Date {
        console.log(`Route: ${route.name} ~> calculateDueDate()`);
        const today = new Date();
        return new Date(today.setDate(today.getDate() + 30));
    }

    /**
     *
     * @param input_date
     * @constructor
     */
    function dueDatePicker() {
        const showDatePicker = () => {
            setShowDueDate(true);
        };

        return (
            // TODO: lägg lite style på datumväljaren! snyggare med flexbox?
            <View style={{ width: '50%' }}>
                <Text style={(Style.Form.labelInputField, { width: '50%' })}>
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
                        onChange={(event: Event, date: Date) => {
                            setDueDate(date);
                            setNewInvoice({
                                ...newInvoice,
                                due_date: date,
                            });
                            setShowDueDate(false);
                        }}
                        value={dueDate}
                    />
                )}
            </View>
        );
    }

    function creationDatePicker() {
        const showDatePicker = () => {
            setShowCreationDate(true);
        };

        return (
            // TODO: lägg lite style på datumväljaren! snyggare med flexbox?
            <View style={{ width: '50%' }}>
                <Text style={(Style.Form.labelInputField, { width: '50%' })}>
                    Förfallodatum
                </Text>

                {Platform.OS === 'android' && (
                    <Button
                        onPress={showDatePicker}
                        title='Visa datumväljare'
                    />
                )}
                {(showCreationDate || Platform.OS === 'ios') && (
                    <DateTimePicker
                        onChange={(event: Event, date: Date) => {
                            setCreationDate(date);
                            setNewInvoice({
                                ...newInvoice,
                                creation_date: date,
                            });
                            setShowCreationDate(false);
                        }}
                        value={creationDate}
                    />
                )}
            </View>
        );
    }

    function invoiceOrderPicker() {
        return (
            <View>
                <Text style={(Style.Form.labelInputField, { width: '50%' })}>
                    Skapa faktura för order:
                </Text>
                <Picker
                    selectedValue={selectedOrder?.id}
                    onValueChange={(itemValue: number, itemIndex: number) => {
                        setSelectedOrder(packedOrders[itemIndex]);
                        setNewInvoice({
                            ...newInvoice,
                            order_id: itemValue,
                            total_price: calculateTotalPrice(),
                        });
                        console.log(
                            `invoiceOrderPicker() ~> order_id: ${itemValue}\n`,
                            `invoiceOrderPicker() ~> order_price: ${calculateTotalPrice()}`,
                        );
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
    }

    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Ordrar'} />
    ) : packedOrders.length > 0 ? (
        <View style={Style.Container.content}>
            {/*<View style={Style.Container.flexBox.row}>*/}
            {/*    <Text*/}
            {/*        style={(Style.Form.labelInputField, { width: '50%' })}>*/}
            {/*        Faktureringsdatum:*/}
            {/*    </Text>*/}
            {/*{InvoiceDatePicker(newInvoice.creation_date)}*/}
            {/*</View>*/}

            {/*<View style={Style.Container.flexBox.row}>*/}
            {/*    <Text*/}
            {/*        style={(Style.Form.labelInputField, { width: '50%' })}>*/}
            {/*        Förfallodatum:*/}
            {/*    </Text>*/}
            {/*    {InvoiceDatePicker(newInvoice.due_date)}*/}
            {/*</View>*/}

            {creationDatePicker()}
            {dueDatePicker()}
            {invoiceOrderPicker()}

            <TouchableOpacity
                style={Style.Button.button}
                onPress={() => {
                    console.log('CLICK -> Skapa Faktura...');
                    console.log(
                        `SelectedOrder ID: ${selectedOrder.id} \n`,
                        selectedOrder,
                    );
                    console.log(`Fakturadatum: ${creationDate}`);
                    console.log(`Förfallodatum: ${dueDate}`);
                }}>
                <Text style={Style.Typography.buttonText}>Skapa Faktura</Text>
            </TouchableOpacity>

            <StatusBar style='auto' />
        </View>
    ) : (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.h1}>
                Det finns inga ordrar som är packeterade och redo att fakturera.
            </Text>
        </View>
    );
};
