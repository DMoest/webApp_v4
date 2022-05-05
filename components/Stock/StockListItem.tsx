import React from 'react';
import { Text, View } from 'react-native';
import * as Style from '../../assets/styles';

/**
 * StockListItem object to return a touchable link element to item detail view.
 *
 * @param navigation
 * @param item
 * @constructor
 */
export const StockListItem = (props) => {
    return (
        <View
            key={props.item.id}
            style={[Style.Container.flexBox.row, Style.Button.button]}>
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
