/**
 * Module imports.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Button,
    ScrollView,
    Text,
    TextInput,
    Platform,
    Pressable,
    View,
    // eslint-disable-next-line import/namespace
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DeliveryProductPicker } from '../components/Delivery/DeliveryProductPicker';
import * as StockInterfaces from '../interfaces/Stock';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';
import * as DeliveryModel from '../models/Deliveries';
import * as ProductModel from '../models/Products';
import config from '../config/config.json';
import * as Style from '../assets/styles/index';

/**
 * Create new delivery form component.
 *
 * @param props
 * @constructor
 */
export const DeliveryCreationForm: React.FC = (props): JSX.Element => {
    /**
     * Constants and functions to set and hold state of new delivery and current product to update.
     */
    const [newDelivery, setNewDelivery] = useState<
        Partial<DeliveriesInterfaces.Deliveries>
    >({});
    const [currentProduct, setCurrentProduct] = useState<
        Partial<StockInterfaces.Stock>
    >({});
    const navigation = props.navigation;

    /**
     * Submit handler function.
     * Creates new delivery from state object newDelivery with Delivery Model.
     * Gets the specific product to update by product_id  in the newDelivery object.
     * Update the product stock from delivery details and product fetch by product_id.
     * Set new state for all deliveries in main list from fetch all deliveries call.
     * Alert user a new delivery has been created.
     * Navigate back to deliveries list.
     */
    const handleSubmit = useCallback(async () => {
        try {
            const updatedProduct = {
                ...currentProduct,
                stock: (currentProduct.stock || 0) + (newDelivery.amount || 0),
            };

            console.log('NewDelivery: ', newDelivery);
            console.log('UpdatedProduct: ', updatedProduct);

            await DeliveryModel.createDelivery(newDelivery);
            await ProductModel.updateProduct(updatedProduct);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            await navigation.navigate('Inleveranslista', {
                reload: true,
            });
        } catch (error) {
            console.log('Error: ', error);
        }
    }, []);

    /**
     * Hook to set initial values from
     */
    useEffect(() => {
        const initialDeliveryValues = {
            product_id: props.route.params.products[0].id.toString(),
            delivery_date: new Date().toLocaleDateString('se-SV'),
            amount: 0,
            comment: '',
            api_key: config.api_key,
        };

        setNewDelivery(initialDeliveryValues);
    }, []);

    /**
     * DateTime Picker Function to create new delivery datetime.
     *
     * @param props
     * @constructor
     */
    function DeliveryDatePicker() {
        const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
        const [show, setShow] = useState<boolean>(false);

        const showDatePicker = () => {
            setShow(true);
        };

        return (
            <View style={{ width: '50%' }}>
                {Platform.OS === 'android' && (
                    <Button
                        onPress={showDatePicker}
                        title='Visa datumväljare'
                    />
                )}
                {(show || Platform.OS === 'ios') && (
                    <DateTimePicker
                        onChange={(event: Event, date: Date) => {
                            setDropDownDate(date);
                            setNewDelivery({
                                ...newDelivery,
                                delivery_date: date.toLocaleDateString('se-SV'),
                            });
                            setShow(false);
                        }}
                        value={dropDownDate}
                    />
                )}
            </View>
        );
    }

    return (
        <ScrollView style={Style.Container.content}>
            <DeliveryProductPicker
                newDelivery={newDelivery}
                setNewDelivery={setNewDelivery}
                products={props.route.params.products}
                setProducts={props.route.params.setProducts}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={Style.Form.labelInputField}>Antal: </Text>
            <TextInput
                style={Style.Form.textInputField}
                onChangeText={(inputAmount: string) => {
                    setNewDelivery({
                        ...newDelivery,
                        amount: parseInt(inputAmount) || 0,
                    });
                }}
                value={newDelivery?.amount?.toString()}
                keyboardType={'numeric'}
            />

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Form.labelInputField, { width: '50%' })}>
                    Leveransdatum:{' '}
                </Text>
                {DeliveryDatePicker()}
            </View>

            <Text style={Style.Form.labelInputField}>Kommentar: </Text>
            <TextInput
                style={Style.Form.textInputField}
                onChangeText={(inputComment: string) => {
                    setNewDelivery({ ...newDelivery, comment: inputComment });
                }}
                value={newDelivery?.comment}
            />

            <Pressable
                style={Style.Button.button}
                onPress={handleSubmit}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </Pressable>

            <StatusBar style='auto' />
        </ScrollView>
    );
};
