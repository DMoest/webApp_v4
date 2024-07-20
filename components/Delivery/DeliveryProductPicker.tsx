import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useAppContext} from '../../context/App.provider';
import * as DeliveriesInterfaces from '../../interfaces/Delivery';
import * as StockInterfaces from '../../interfaces/Product';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles/index';


/**
 * Type for DeliveryProductPicker Component input props.
 */
type NewDeliveryPropsType = {
    newDelivery: Partial<DeliveriesInterfaces.Delivery>;
    setNewDelivery: () => void;
    setSelectedProduct: (productsHash: any) => void;
};

/**
 * Picker Component for Product to add to a new delivery.
 *
 * @constructor
 * @param props
 */
export const DeliveryProductPicker: (
    props: NewDeliveryPropsType,
) => React.JSX.Element = (props: NewDeliveryPropsType): React.JSX.Element => {
    const appContext = useAppContext();
    const productsHash: any = {};

    useEffect(() => {
        async function loadProducts() {
            appContext.setProducts(await ProductModel.getProducts());
        }

        void loadProducts();
    }, []); //

    const pickerProductsList: React.JSX.Element[] = appContext.products.map(
        (product: StockInterfaces.Product, index: number) => {
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
