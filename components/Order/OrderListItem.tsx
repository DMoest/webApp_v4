/**
 * Module imports.
 */
import React from 'react';
import { Text, View } from 'react-native';
import * as Style from '../../assets/styles';

/**
 * Order list item props type object. Used to type input props to component OrderListItem.
 */
type OrderListItemPropsType = {
    item: {
        id: number;
        name: string;
        status_id: string;
    };
};

/**
 * OrderListItem object to return a touchable link element to order detail view.
 *
 * @constructor
 * @param props
 */
export const OrderListItem = (props): React.JSX.Element => {
    return (
        <View
            key={props.item.id}
            style={Style.Container.grid.row}>
            <Text style={Style.Typography.dataLeft}>{props.item.id}</Text>
            <Text style={Style.Typography.dataCenter}>{props.item.name}</Text>
            <Text style={Style.Typography.dataRight}>
                {props.item.status_id}
            </Text>
        </View>
    );
};
