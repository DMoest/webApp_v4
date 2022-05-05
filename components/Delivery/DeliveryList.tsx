import React, { useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { DeliveryListItem } from './DeliveryListItem';
import * as DeliveryModel from '../../models/Deliveries';
import * as Style from '../../assets/styles';
import { useNavigation } from '@react-navigation/native';

/**
 * DeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const DeliveryList: React.FC = (props) => {
    useEffect(async () => {
        props.setDeliveries(await DeliveryModel.getDeliveries());
    }, [props.deliveries]);

    const navigation = useNavigation();

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({ item }) => (
        <Pressable
            key={item.id}
            onPress={() => {
                navigation.navigate('Inleveransspecifikation', { item });
            }}
            style={Style.Button.buttonContainer}>
            <DeliveryListItem item={item} />
        </Pressable>
    );

    return (
        <View>
            <FlatList
                style={Style.Container.flatList}
                data={props.deliveries}
                // keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};
