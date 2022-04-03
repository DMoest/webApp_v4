import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../assets/themes/theme';


/**
 * DeliveryListItem object to return a touchable link element to delivery detail view.
 *
 * @param navigation
 * @param delivery
 * @constructor
 */
const DeliveryListItem = ({navigation, delivery}) => {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
                navigation.navigate('DeliveryListItem', {delivery})
            }} >
            <View key={delivery.id} style={[styles.listItem, styles.button]} >
                <View style={styles.flexRow2}>
                    <Text style={[styles.btnText]}>{delivery.id}</Text>
                    <Text style={[styles.btnText]}>{delivery.delivery_date}</Text>
                </View>

                <View style={styles.flexColumn3}>
                    <View style={styles.flexRow2}>
                        <Text style={styles.text}>Product ID: </Text>
                        <Text style={styles.text}>{delivery.product_id}</Text>
                    </View>

                    <View style={styles.flexRow2}>
                        <Text style={styles.text}>Product: </Text>
                        <Text style={styles.text}>{delivery.product_name}</Text>
                    </View>

                    <View style={styles.flexRow2}>
                        <Text style={styles.text}>Amount: </Text>
                        <Text style={styles.text}>{delivery.amount} st</Text>
                    </View>
                </View>

                <View style={styles.flexCol2}>
                    <Text style={styles.text}>Comment:</Text>
                    <Text style={styles.text}>{delivery.comment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

/**
 * DeliveryListItem object styles.
 */
const styles = StyleSheet.create({
    listItem: {
        flex: 3,
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
    flexRow2: {
        width: '100%',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    flexColumn3: {
        width: '100%',
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        fontFamily: theme.Typography.textFont
    },
    flexCol2: {

    }
});

/**
 * Module exports.
 */
export default DeliveryListItem;
