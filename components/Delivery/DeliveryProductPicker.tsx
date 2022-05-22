import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/namespace
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as StockInterfaces from '../../interfaces/Stock';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles/index';

/**
 * Type for DeliveryProductPicker Component input props.
 */
type NewDeliveryPropsType = {
    newDelivery: Partial<DeliveriesInterfaces.Deliveries>;
    setNewDelivery: any;
    currentProduct: StockInterfaces.Stock;
    setCurrentProduct: any;
};

/**
 * Picker Component for Products to add to a new delivery.
 *
 * @constructor
 * @param props
 */
export const DeliveryProductPicker: (
    props: NewDeliveryPropsType,
) => JSX.Element = (props: NewDeliveryPropsType): JSX.Element => {
    const [products, setProducts] = useState<Product[]>([]);
    const productsHash: any = {};

    useEffect(async () => {
        setProducts(await ProductModel.getProducts());
    }, []);

    const pickerProductsList = products.map(
        (product: StockInterfaces.Stock, index: number) => {
            productsHash[product.id] = product;

            return (
                <Picker.Item
                    key={index}
                    label={product.name}
                    value={product.id}
                />
            );
        },
    );

    return (
        <View>
            <Text style={Style.Form.labelInputField}>Produkt: </Text>
            <Picker
                selectedValue={props.newDelivery?.product_id}
                onValueChange={(productIdValue: string) => {
                    props.setCurrentProduct(
                        productsHash[parseInt(productIdValue)],
                    );

                    props.setNewDelivery({
                        ...props.newDelivery,
                        product_id: parseInt(productIdValue),
                    });
                }}>
                {pickerProductsList}
            </Picker>
        </View>
    );
};
