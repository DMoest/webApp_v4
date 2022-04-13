import React from 'react';
import {Text, View} from 'react-native';
import * as Style from '../assets/styles/index';


/**
 * StockListItem object to return a touchable link element to item detail view.
 *
 * @param navigation
 * @param item
 * @constructor
 */
export const StockListItem = ({item}) => {
    console.log("StockListItem", item)
    return (
        <View key={item.id} style={[Style.Container.flexBox.row, Style.Button.button]}>
            <Text style={Style.Typography.dataLeft}>{item.name}</Text>
            <Text style={Style.Typography.dataCenter}>{item.article_number}</Text>
            <Text style={Style.Typography.dataRight}>{item.stock} st</Text>
        </View>
    )
}
