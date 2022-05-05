import React, { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as Style from '../assets/styles';
import { NavigationProp, RouteProp } from '@react-navigation/native';

/**
 * StockListItem screen/view.
 *
 * @constructor
 * @param props
 */
export const StockItem: React.FC = (
    props:
        | NavigationProp<object | never>
        | RouteProp<any>
        | PropsWithChildren<string | number | boolean | object | []>,
) => {
    const product = props.route.params.item;

    return (
        <View style={[Style.Base.content]}>
            {/*<Text>Hej här ska det vara en produkt-view!!! ...vart är dina props?</Text>*/}
            <Text style={Style.Typography.subHeader}>{product.name}</Text>

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Typography.dataLeft, { flex: 1 })}>
                    ID:{' '}
                </Text>
                <Text style={(Style.Typography.dataRight, { flex: 2 })}>
                    {product.id}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Typography.dataLeft, { flex: 1 })}>
                    Artikel nr:{' '}
                </Text>
                <Text style={(Style.Typography.dataRight, { flex: 2 })}>
                    {product.article_number}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Typography.dataLeft, { flex: 1 })}>
                    Plats:{' '}
                </Text>
                <Text style={(Style.Typography.dataRight, { flex: 2 })}>
                    {product.location}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Typography.dataLeft, { flex: 1 })}>
                    Pris:{' '}
                </Text>
                <Text style={(Style.Typography.dataRight, { flex: 2 })}>
                    {product.price} kr
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Typography.dataLeft, { flex: 1 })}>
                    Beskrivning:{' '}
                </Text>
                <Text style={(Style.Typography.dataRight, { flex: 2 })}>
                    {product.description}
                </Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={(Style.Typography.dataLeft, { flex: 1 })}>
                    Specifikation:{' '}
                </Text>
                <Text style={(Style.Typography.dataRight, { flex: 2 })}>
                    {product.specifiers}
                </Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
