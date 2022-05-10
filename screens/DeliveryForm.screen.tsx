import React, {
    useState,
    useCallback,
    useEffect,
    PropsWithChildren,
} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Pressable,
    Alert,
    // eslint-disable-next-line import/namespace
} from 'react-native';
// import { CreateDeliveryFrom } from '../components/Delivery/DeliveryCreateForm';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stock } from '../interfaces/Stock';
// import * as ProductModels from '../models/Products';
import * as Style from '../assets/styles/index';
import * as ProductModel from '../models/Products';

/**
 * Create new delivery form component.
 *
 * @param props
 * @constructor
 */
export const DeliveryCreationForm: React.FC = (
    props:
        | PropsWithChildren<never>
        | NavigationProp<object>
        | RouteProp<never>
        | React.ReactNode
        | never,
): JSX.Element => {
    const [allProducts, setProducts] = useState<Stock[]>([]);
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);

    const [productId, setProductId] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [comment, setComment] = useState('');

    useEffect(async () => {
        setProducts(await ProductModel.getProducts());
    }, [allProducts]);

    const pickerProductItems = allProducts.map((product, index) => {
        return (
            <Picker.Item
                key={product.id}
                label={product.name}
                value={product.id}
            />
        );
    });

    // console.log('PROPS: ', props);

    const handleSubmit = useCallback(() => {
        console.log('CLICK! -> handle the submit... ');
        console.log('Product ID: ', productId);
        console.log('Antal: ', amount);
        console.log('Leveransdatum: ', deliveryDate);
        console.log('Kommentar: ', comment);

        Alert.alert(
            `Ni har skapat en ny inleverans. \nproduct ID: ${productId} \nantal: ${amount} \nleveransdatum: ${deliveryDate} \nKommentar: ${deliveryDate} `,
        );

        props.navigation.goBack();
    }, [props.navigation]);

    return (
        <ScrollView style={Style.Container.content}>
            <View>
                <Text style={Style.Form.labelInputField}>Produkt id: </Text>
                <Picker
                    selectedValue={productId}
                    onValueChange={(productId: string) => {
                        setProductId(productId);
                    }}>
                    {pickerProductItems}
                </Picker>
            </View>

            <View>
                <Text style={Style.Form.labelInputField}>Leveransdatum: </Text>
                <DateTimePicker
                    onValueChange={(event: Event, date: Date) => {
                        setDropDownDate(date);

                        setDeliveryDate({
                            deliveryDate,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            </View>

            <Text style={Style.Form.labelInputField}>Antal: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={amount}
                onChangeText={setAmount}
                keyboardType={'numeric'}
            />

            <Text style={Style.Form.labelInputField}>Kommentar: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={comment}
                onChangeText={setComment}
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
