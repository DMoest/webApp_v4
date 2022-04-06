import React from 'react';
import {Text, View} from 'react-native';
import * as Style from '../assets/styles/index';


/**
 * OrderListItem object to return a touchable link element to order detail view.
 *
 * @param navigation
 * @param order
 * @constructor
 */
export const OrderListItem = ({item}) => {
    return (
        <View key={item.id} style={[Style.Container.flexBox.row, Style.Button.button]}>
            <Text style={Style.Typography.dataLeft}>{item.id}</Text>
            <Text style={Style.Typography.dataCenter}>{item.name}</Text>
            <Text style={Style.Typography.dataRight}>{item.status_id}</Text>
        </View>
    )
}
