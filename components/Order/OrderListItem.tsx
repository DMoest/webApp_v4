/**
 * Module imports.
 */
import React from 'react';
// eslint-disable-next-line import/namespace
import { Text, View } from 'react-native';
import * as Style from '../../assets/styles';
import { listButton } from '../../assets/styles/buttons';

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
export const OrderListItem = (props: OrderListItemPropsType) => {
    return (
        <View
            key={props.item.id.toString()}
            style={Style.Button.listButton}>
            <Text style={Style.Typography.dataLeft}>{props.item.id}</Text>
            <Text style={Style.Typography.dataCenter}>{props.item.name}</Text>
            <Text style={Style.Typography.dataRight}>
                {props.item.status_id}
            </Text>
        </View>
    );
};
