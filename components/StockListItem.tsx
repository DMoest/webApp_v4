import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Style from '../assets/styles/index';
import {theme} from '../assets/styles/theme';


/**
 * StockListItem object to return a touchable link element to item detail view.
 *
 * @param navigation
 * @param item
 * @constructor
 */
export const StockListItem = ({item}) => {
    return (
        <View key={item.id} style={[Style.Container.flexBox.row, Style.Button.button]} >
            <Text style={Style.Typography.dataLeft}>{item.name}</Text>
            <Text style={Style.Typography.dataCenter}>{item.article_number}</Text>
            <Text style={Style.Typography.dataRight}>{item.stock} st</Text>
        </View>
    )
}
