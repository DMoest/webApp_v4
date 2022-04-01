import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../assets/themes/theme';


/**
 * OrderItem object to return a touchable link element to order detail view.
 *
 * @param navigation
 * @param order
 * @constructor
 */
const OrderItem = ({navigation, order}) => {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
                navigation.navigate('OrderItem', {order})
            }}>
            <View key={order.id} style={[styles.listItem, styles.button]}>
                <Text style={styles.btnText}>{order.id}</Text>
                <Text style={styles.btnText}>{order.name}</Text>
                {/*<Text style={styles.btnText}>{order.zip}</Text>*/}
                {/*<Text style={styles.btnText}>{order.city}</Text>*/}
                {/*<Text style={styles.btnText}>{order.country}</Text>*/}
                <Text style={styles.btnText}>{order.status_id}</Text>
            </View>
        </TouchableOpacity>
    )
}

/**
 * OrderItem object styles.
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
export default OrderItem;
