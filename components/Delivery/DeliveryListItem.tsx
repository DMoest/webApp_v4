import React from 'react';
import { Text, View } from 'react-native';
import * as Style from '../../assets/styles';

/**
 * DeliveryListItem object to return a touchable link element to delivery detail view.
 *
 * @param navigation
 * @param delivery
 * @constructor
 */
export const DeliveryListItem: React.FC = ({ item }) => {
    // console.log("DeliveryListItem: ", item);

    return (
        <View
            key={item.id}
            style={[Style.Container.flexBox.row, Style.Button.button]}>
            <View style={Style.Container.flexBox.rowNoPadding}>
                <Text style={Style.Typography.dataLeft}>{item.id}</Text>
                <Text style={Style.Typography.dataRight}>
                    {item.product_name}
                </Text>
                <Text style={Style.Typography.dataLeft}>
                    {item.delivery_date}
                </Text>
            </View>

            <View style={Style.Container.flexBox.column}>
                <Text style={Style.Typography.dataLeft}>Kommentar: </Text>
                <Text style={Style.Typography.dataLeft}>{item.comment}</Text>
            </View>
        </View>
    );
};
