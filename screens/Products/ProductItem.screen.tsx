import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../../assets/styles';

/**
 * ProductListItem screen/view.
 *
 * @constructor
 */
export const StockItem: () => React.JSX.Element = () => {
    const product = useRoute().params?.item;

    return (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.subHeader}>{product.name}</Text>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Produkt id: </Text>
                <Text style={Style.Typography.dataRight}>{product.id}</Text>
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Artikel nr: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product.article_number}
                </Text>
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Lagerplats: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product.location}
                </Text>
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Lagersaldo: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product.stock} st
                </Text>
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Pris: </Text>
                <Text style={Style.Typography.dataRight}>
                    {product.price} kr/st
                </Text>
            </View>

            <View
                style={[
                    Style.Container.grid.row,
                    {
                        paddingVertical: Style.Typography.whiteSpace[50],
                    },
                ]}>
                <Text style={Style.Typography.dataLeft}>Beskrivning: </Text>
                <Text style={Style.Typography.dataLeft}>
                    {product.description}
                </Text>
            </View>

            <View
                style={[
                    Style.Container.grid.row,
                    {
                        paddingVertical: Style.Typography.whiteSpace[50],
                    },
                ]}>
                <Text style={Style.Typography.dataLeft}>Specifikation: </Text>
                <Text style={Style.Typography.dataLeft}>
                    {product.specifiers}
                </Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
