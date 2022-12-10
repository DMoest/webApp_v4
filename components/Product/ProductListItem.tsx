/**
 * Module imports.
 */
import React from 'react';
// eslint-disable-next-line import/namespace
import { View, Text } from 'react-native';
import * as Style from '../../assets/styles';

/**
 * Product list item props type object. Used to type input props to component ProductListItem.
 */
type StockListItemPropsType = {
    item: {
        name: string;
        article_number: string;
        stock: number;
    };
};

/**
 * ProductListItem object to return a touchable link element to item detail view.
 *
 * @constructor
 * @param props
 */
export const ProductListItem = (props: StockListItemPropsType) => {
    return (
        <View
            key={props.item.id.toString()}
            style={Style.Button.listButton}>
            <Text style={Style.Typography.dataLeft}>{props.item.name}</Text>
            <Text style={Style.Typography.dataCenter}>
                {props.item.article_number}
            </Text>
            <Text style={Style.Typography.dataRight}>
                {props.item.stock} st
            </Text>
        </View>
    );
};
