/**
 * Module imports.
 */
import React, {useEffect} from 'react';
// eslint-disable-next-line import/namespace
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useAppContext} from '../../context/App.provider';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as StockInterfaces from '../../interfaces/Product';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles/index';

/**
 * Type for DeliveryProductPicker Component input props.
 */
type NewDeliveryPropsType = {
    newDelivery: Partial<DeliveriesInterfaces.Deliveries>;
    setNewDelivery: () => void;
    setSelectedProduct: () => void;
};

/**
 * Picker Component for Product to add to a new delivery.
 *
 * @constructor
 * @param props
 */
export const DeliveryProductPicker: (
    props: NewDeliveryPropsType,
) => JSX.Element = (props: NewDeliveryPropsType): JSX.Element => {
    // eslint-disable-next-line prefer-const
    let productsHash: any = {};
    const appContext = useAppContext();

    useEffect(() => {
        async function loadProducts() {
            appContext.setProducts(await ProductModel.getProducts());
        }

        void loadProducts();
    }, []);

    const pickerProductsList = appContext.products.map(
        (product: StockInterfaces.Product, index: number) => {
            productsHash[product.id] = product;

            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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
                    props.setNewDelivery({
                        ...props.newDelivery,
                        product_id: productIdValue,
                    });
                    props.setSelectedProduct(productsHash[productIdValue]);
                }}>
                {pickerProductsList}
            </Picker>
        </View>
    );
};
