import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    ScrollView,
    Text,
    TextInput,
    Pressable,
    Alert,
    View,
    Platform,
    Button,
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
     * Inital values for object to represent a new delivery.
     * We use let to declare so we can rewrite this later while we set state.
     */
    let initialDeliveryValues = {
        product_id: '',
        delivery_date: Date.now().toString(),
        amount: 0,
        comment: '',
        api_key: config.api_key,
    };

    /**
     * Constant and function to set and hold state of new delivery.
     */
    const [newDelivery, setNewDelivery] = useState<
        Partial<DeliveriesInterfaces.Deliveries>
    >(initialDeliveryValues);

    /**
     * Submit handler function.
     */
    const handleSubmit = useCallback(async () => {
        try {
            const thisDelivery = await DeliveryModel.createDelivery(
                newDelivery,
            );

            console.log('Click!\n* -> NewDelivery: ', newDelivery);
            Alert.alert(
                `Ny inleverans skapad.\nproduct_id: ${newDelivery.product_id}\ndelivery_date: ${newDelivery.delivery_date}\namount: ${newDelivery.amount}\ncomment: ${newDelivery.comment}\n`,
            );

            // TODO GET request for a specific product by thisDelivery.product_id

            await ProductModel.updateProductStockFromDelivery(
                thisDelivery.data,
            );

            props.navigation.goBack();
        } catch (error) {
            console.log('Error: ', error);
        }
    }, [newDelivery, props.navigation]);

    /**
     * Hook to set initial values from
     */
    useEffect(() => {
        // console.log('Delivery Form PROPS: ', props);
        const dateNow = Date.now();

        initialDeliveryValues = {
            product_id: props.route.params.products[0].id.toString(),
            delivery_date: dateNow.toLocaleString(),
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
            />

            <Text style={Style.Form.labelInputField}>Antal: </Text>
            <TextInput
                style={Style.Form.textInputField}
                onChangeText={(inputAmount: string) => {
                    setNewDelivery({
                        ...newDelivery,
                        amount: parseInt(inputAmount),
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
