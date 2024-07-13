/**
 * Module imports.
 */
import React from 'react';
import {Text, View} from 'react-native';
import * as Style from '../../assets/styles';


/**
 * DeliveryListItem object to return a touchable link element to delivery detail view.
 *
 * @param navigation
 * @param delivery
 * @constructor
 */
export const DeliveryListItem = ({item}): React.JSX.Element => {
    return (
        <View key={item.id}>
            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>{item.id}</Text>
                <Text style={Style.Typography.dataCenter}>
                    {item.product_name}
                </Text>
                <Text style={Style.Typography.dataLeft}>
                    {item.delivery_date}
                </Text>
            </View>

            <View style={Style.Container.grid.column}>
                <Text style={Style.Typography.dataLeft}>Kommentar: </Text>
                <Text style={Style.Typography.dataRight}>{item.comment}</Text>
            </View>
        </View>
    );
};
