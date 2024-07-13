import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppContext } from '../../context/App.provider';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DeliveryProductPicker } from '../../components/Delivery/DeliveryProductPicker';
import { StatusBar } from 'expo-status-bar';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as StockInterfaces from '../../interfaces/Product';
import * as ProductModel from '../../models/Products';
import * as DeliveryModel from '../../models/Deliveries';
import config from '../../config/config.json';
import * as Style from '../../assets/styles';
import { Deliveries } from '../../interfaces/Deliveries';

/**
 * Create new delivery form component.
 *
 * @constructor
 */
export const DeliveryCreationForm: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation();
    const appContext = useAppContext();

    const [newDelivery, setNewDelivery] =
        useState<Partial<DeliveriesInterfaces.Deliveries>>();
    const [selectedProduct, setSelectedProduct] =
        useState<StockInterfaces.Product>(appContext.products[0]);

    /**
     * Hook to set initial values from
     */
    useEffect(() => {
        const fetchProductsAndSetInitialValues = async () => {
            if (appContext.products.length === 0) {
                await ProductModel.getProducts().then((products) => {
                    appContext.setProducts(products);
                });
            }

            const initialDeliveryValues: Deliveries = {
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
     * @param props
     * @constructor
     */
    function DeliveryDatePicker(): React.JSX.Element {
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

    async function handleSubmit() {
        try {
            const updatedProduct = {
                ...selectedProduct,
                stock: (selectedProduct.stock || 0) + (newDelivery.amount || 0),
            };

            await DeliveryModel.createDelivery(newDelivery);
            await ProductModel.updateProduct(updatedProduct);

            await Alert.alert(
                'Ny Inleverans har skapats.\n \n' +
                    `Produkt id: ${newDelivery.product_id}\n` +
                    `Antal: ${newDelivery.amount}\n` +
                    `Leveransdatum: ${newDelivery.delivery_date}\n` +
                    `Kommentar: ${newDelivery.comment}\n` +
                    `Nytt lagersaldo: ${updatedProduct.stock}`,
            );
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
                    onChangeText={(inputComment: string) => {
                        setNewDelivery({
                            ...newDelivery,
                            comment: inputComment,
                        });
                    }}
                    value={newDelivery?.comment}
                />
            </View>

            <TouchableOpacity
                style={Style.Button.buttonContainer}
                onPress={async () => {
                    // Create New Delivery, Update Product Stock & Alert User.
                    await handleSubmit();

                    // Navigate back to deliveries list with param.reload = true.
                    await navigation.navigate('Inleveranslista', {
                        reload: true,
                    });
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </TouchableOpacity>

            <StatusBar style='auto' />
        </ScrollView>
    );
};
