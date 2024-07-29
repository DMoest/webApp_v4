/**
 * @module DeliveryCreationForm
 *
 * This module provides a form for creating a new delivery. It includes fields for product selection,
 * amount, delivery date, and comments. The form also includes a date picker for selecting the delivery date.
 * Upon form submission, a new delivery is created and the selected product's stock is updated.
 *
 * @requires react
 * @requires react-native
 * @requires @react-native-community/datetimepicker
 * @requires expo-status-bar
 * @requires react-native-flash-message
 * @requires @react-navigation/native
 * @requires ../../components/Delivery/DeliveryProductPicker
 * @requires ../../context/App.provider
 * @requires ../../config/config.json
 * @requires ../../assets/styles
 * @requires ../../interfaces/Delivery
 * @requires ../../interfaces/Product
 * @requires ../../models/Deliveries
 * @requires ../../models/Products
 */
import React, { useEffect, useState } from 'react';
import {
    Button,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { DeliveryProductPicker } from '../../components/Delivery/DeliveryProductPicker';
import { useAppContext } from '../../context/App.provider';
import config from '../../config/config.json';
import * as Style from '../../assets/styles';
import * as DeliveriesInterfaces from '../../interfaces/Delivery';
import { Delivery } from '../../interfaces/Delivery';
import * as StockInterfaces from '../../interfaces/Product';
import * as DeliveryModel from '../../models/Deliveries';
import * as ProductModel from '../../models/Products';

/**
 * Create new delivery form component.
 *
 * This component provides a form for creating a new delivery. It includes fields for product selection,
 * amount, delivery date, and comments. The form also includes a date picker for selecting the delivery date.
 * Upon form submission, a new delivery is created and the selected product's stock is updated.
 *
 * @constructor
 * @returns {React.ReactElement} The delivery creation form component.
 */
export const DeliveryCreationForm: React.FC = (): React.ReactElement => {
    const navigation = useNavigation();
    const appContext = useAppContext();

    const [newDelivery, setNewDelivery] =
        useState<Partial<DeliveriesInterfaces.Delivery>>();
    const [selectedProduct, setSelectedProduct] =
        useState<StockInterfaces.Product>(appContext.products[0]);

    /**
     * Hook to set initial values for the delivery form.
     *
     * This hook is executed after the component mounts and fetches the products if they are not already
     * loaded. It then sets the initial values for the delivery form, including the product_id,
     * delivery_date, amount, comment, and api_key. The product_id is set to the id of the first product,
     * the delivery_date is set to the current date, the amount is set to 0, the comment is set to an
     * empty string, and the api_key is set from the config.
     *
     * @requires react
     * @requires ../../models/Products
     * @requires ../../context/App.provider
     * @requires ../../config/config.json
     * @requires ../../interfaces/Delivery
     */
    useEffect((): void => {
        const fetchProductsAndSetInitialValues = async (): Promise<void> => {
            if (appContext.products.length === 0) {
                await ProductModel.getProducts().then((products): void => {
                    appContext.setProducts(products);
                });
            }

            const initialDeliveryValues: Delivery = {
                product_id: appContext.products[0].id.toString(),
                delivery_date: new Date().toLocaleDateString('se-SV'),
                amount: 0,
                comment: '',
                api_key: config.api_key,
            };

            setNewDelivery(initialDeliveryValues);
        };

        fetchProductsAndSetInitialValues();
    }, []);

    /**
     * DateTime Picker Function to create new delivery datetime.
     *
     * This function provides a date picker for selecting the delivery date. It includes a button for
     * showing the date picker and a DateTimePicker component for selecting the date. The selected date is
     * then set as the delivery date.
     *
     * @constructor
     * @returns {React.ReactElement} The date picker component.
     */
    function DeliveryDatePicker(): React.ReactElement {
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
                        onChange={(event: Event, date: Date): void => {
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

    /**
     * Handle form submission.
     *
     * This function handles the form submission. It creates a new delivery with the form data and
     * updates the selected product's stock. It also displays a success message with the new delivery's
     * details and the updated product's stock.
     */
    async function handleSubmit(): Promise<void> {
        try {
            const updatedProduct = {
                ...selectedProduct,
                stock: (selectedProduct.stock || 0) + (newDelivery.amount || 0),
            };

            await DeliveryModel.createDelivery(newDelivery);
            await ProductModel.updateProduct(updatedProduct);

            showMessage({
                message:
                    'Ny Inleverans har skapats.\n \n' +
                    `Produkt id: ${newDelivery.product_id}\n` +
                    `Antal: ${newDelivery.amount}\n` +
                    `Leveransdatum: ${newDelivery.delivery_date}\n` +
                    `Kommentar: ${newDelivery.comment}\n` +
                    `Nytt lagersaldo: ${updatedProduct.stock}`,
                description: 'E-post eller lösenord saknas',
                type: 'success',
                duration: 3500,
            });
        } catch (error) {
            console.error('Handle Submit Error: ', error);
        }
    }

    return (
        <ScrollView style={Style.Container.content}>
            <DeliveryProductPicker
                newDelivery={newDelivery}
                setNewDelivery={setNewDelivery}
                setSelectedProduct={setSelectedProduct}
            />

            <View style={Style.Container.grid.row}>
                <Text style={Style.Form.labelInputField}>Antal: </Text>
                <TextInput
                    style={Style.Form.textInputField}
                    onChangeText={(inputAmount: string): void => {
                        setNewDelivery({
                            ...newDelivery,
                            amount: parseInt(inputAmount) || 0,
                        });
                    }}
                    value={newDelivery?.amount?.toString()}
                    keyboardType={'numeric'}
                    placeholder='Antal av levererad produkt.'
                />
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={(Style.Form.labelInputField, { width: '50%' })}>
                    Leveransdatum:
                </Text>
                {DeliveryDatePicker()}
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Form.labelInputField}>Kommentar: </Text>
                <TextInput
                    style={Style.Form.textInputField}
                    onChangeText={(inputComment: string): void => {
                        setNewDelivery({
                            ...newDelivery,
                            comment: inputComment,
                        });
                    }}
                    value={newDelivery?.comment}
                />
            </View>

            <Pressable
                style={Style.Button.buttonContainer}
                onPress={async (): Promise<void> => {
                    // Create New Delivery, Update Product Stock & Alert User.
                    await handleSubmit();

                    // Navigate back to deliveries list with param.reload = true.
                    navigation.navigate('Inleveranslista', {
                        reload: true,
                    });
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </Pressable>

            <StatusBar style='auto' />
        </ScrollView>
    );
};
