import React from 'react';
import {Text, View} from 'react-native';
import * as Style from '../../assets/styles';


/**
 * OrderListItem object to return a touchable link element to order detail view.
 *
 * @param navigation
 * @param order
 * @constructor
 */
export const OrderListItem = (props) => {
    return (
        <View key={props.item.id} style={[Style.Container.flexBox.row, Style.Button.button]}>
            <Text style={Style.Typography.dataLeft}>{props.item.id}</Text>
            <Text style={Style.Typography.dataCenter}>{props.item.name}</Text>
            <Text style={Style.Typography.dataRight}>{props.item.status_id}</Text>
        </View>
    )
}
