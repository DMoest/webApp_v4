/**
 * Module imports.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
    Alert,
    Button,
    ScrollView,
    Text,
    TextInput,
    Platform,
    View,
    TouchableOpacity,
    // eslint-disable-next-line import/namespace
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/App.provider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DeliveryProductPicker } from '../../components/Delivery/DeliveryProductPicker';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as StockInterfaces from '../../interfaces/Product';
import * as ProductModel from '../../models/Products';
import * as DeliveryModel from '../../models/Deliveries';
import { StatusBar } from 'expo-status-bar';
import config from '../../config/config.json';
import * as Style from '../../assets/styles';

/**
 * Create new delivery form component.
 *
 * @constructor
 */
export const DeliveryCreationForm: React.FC = (): JSX.Element => {
    const navigation = useNavigation();
    const appContext = useAppContext();
    let initialDeliveryValues = {
        product_id: appContext.products[0].id.toString(),
        delivery_date: new Date().toLocaleDateString('se-SV'),
        amount: 0,
        comment: '',
        api_key: config.api_key,
    };
    const [newDelivery, setNewDelivery] = useState<
        Partial<DeliveriesInterfaces.Deliveries>
    >(initialDeliveryValues);
    const [selectedProduct, setSelectedProduct] =
        useState<StockInterfaces.Product>(appContext.products[0]);

    /**
     * Hook to set initial values from
     */
    useEffect(() => {
        initialDeliveryValues = {
            product_id: appContext.products[0].id.toString(),
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
                ...selectedProduct,
                stock: (selectedProduct.stock || 0) + (newDelivery.amount || 0),
            };

            await DeliveryModel.createDelivery(newDelivery);
            await ProductModel.updateProduct(updatedProduct);

            Alert.alert(
                'Ny Inleverans har skapats.\n \n' +
                    `Produkt id: ${newDelivery.product_id}\n` +
                    `Antal: ${newDelivery.amount}\n` +
                    `Leveransdatum: ${newDelivery.delivery_date}\n` +
                    `Kommentar: ${newDelivery.comment}`,
            );

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            navigation.navigate('Inleveranslista', {
                reload: true,
            });
        } catch (error) {
            console.log('Handle Submit Error: ', error);
        }
    }, [selectedProduct, navigation, newDelivery]);

    return (
        <ScrollView style={Style.Container.content}>
            <DeliveryProductPicker
                newDelivery={newDelivery}
                setNewDelivery={setNewDelivery}
                setSelectedProduct={setSelectedProduct}
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
                placeholder='Antal av levererad produkt.'
            />

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Form.labelInputField, { width: '50%' })}>
                    Leveransdatum:
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

            <TouchableOpacity
                style={Style.Button.button}
                onPress={handleSubmit}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </TouchableOpacity>

            <StatusBar style='auto' />
        </ScrollView>
    );
};
