import React from "react";
import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import * as Style from "../assets/styles";


/**
 * DeliveryListItem screen/view.
 *
 * @param route
 * @constructor
 */
export const DeliveryItem: React.FC = ({route}) => {
    const item = route.params.item

    return (
        <View style={[Style.Container.content]}>
                <Text style={Style.Typography.dataLeft}>{item.id}</Text>
                <Text style={Style.Typography.dataLeft}>{item.product_id}</Text>
                <Text style={Style.Typography.dataLeft}>{item.product_name}</Text>
                <Text style={Style.Typography.dataLeft}>{item.amount}</Text>
                <Text style={Style.Typography.dataLeft}>{item.comment}</Text>
            <StatusBar style="auto"/>
        </View>
    );
}
