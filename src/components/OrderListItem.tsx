import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../assets/themes/theme';


/**
 * OrderListItem object to return a touchable link element to order detail view.
 *
 * @param navigation
 * @param order
 * @constructor
 */
const OrderListItem = ({navigation, order}) => {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
                navigation.navigate('OrderListItem', {order})
            }}>
            <View key={order.id} style={[styles.listItem, styles.button]}>
                <View style={styles.idContainer}>
                    <Text style={styles.btnText}>{order.id}</Text>
                    <Text style={styles.btnText}>{order.name}</Text>

                    <Text style={styles.btnText}>{order.status_id}</Text>
                </View>

                <View style={styles.address_container}>
                    <Text style={styles.addressText}>{order.address}</Text>

                    <View style={styles.zipCodeAndCity}>
                        <Text style={styles.addressText}>{order.zip}</Text>
                        <Text style={[styles.addressText, styles.city]}>{order.city}</Text>
                    </View>

                    <Text style={styles.addressText}>{order.country}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

/**
 * OrderListItem object styles.
 */
const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        flex: 2,
        flexDirection: 'column',
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
    idRow: {
        width: '100%',
    },
    idContainer: {
        width: '100%',
        marginBottom: 10,
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    address_container: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    zipCodeAndCity: {
        width: '100%',
        flex: 2,
        flexDirection: 'row',
    },
    city: {
        paddingHorizontal: 10,
    },
    addressText: {
        fontSize: 12,
        fontFamily: theme.Typography.textFont,
    }
});

/**
 * Module exports.
 */
export default OrderListItem;
