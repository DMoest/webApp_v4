import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../assets/themes/theme';


/**
 * DeliveryItem object to return a touchable link element to delivery detail view.
 *
 * @param navigation
 * @param delivery
 * @constructor
 */
const DeliveryItem = ({navigation, delivery}) => {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
                navigation.navigate('DeliveryItem', {delivery})
            }} >
            <View key={delivery.id} style={[styles.listItem, styles.button]} >
                <Text>ID: {delivery.id}</Text>
                <Text>Product_ID: {delivery.product_id}</Text>
                <Text>Product Name: {delivery.product_name}</Text>
            </View>
        </TouchableOpacity>
    )
}

/**
 * DeliveryItem object styles.
 */
const styles = StyleSheet.create({
    listItem: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnContainer: {
        width: '100%',
        shadowColor: theme.Colors.shadows,
        shadowOffset: theme.Abstracts.btnOffset,
        shadowOpacity: theme.Abstracts.btnOpacity,
        shadowRadius: theme.Abstracts.btnRadius,
        elevation: theme.Abstracts.btnElevation,
    },
    button: {
        width: '100%',
        overflow: 'hidden',
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        marginBottom: theme.Container.btnSmallMarginB,
        borderRadius: theme.Container.bthRadius,
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    },
    btnText: {
        fontSize: theme.Typography.btnSmallFontSize,
        fontFamily: theme.Typography.btnFont,
        color: theme.Colors.textColorDark,
    },
    imgStatus: {
        width: 5,
        height: 5,

    },
});

/**
 * Module exports.
 */
export default DeliveryItem;
