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
                    <Text style={[styles.text]}>{delivery.id}</Text>
                    <Text style={[styles.text]}>{delivery.delivery_date}</Text>
                </View>

                <View style={styles.flexColumn3}>
                    <View style={styles.flexRow2}>
                        <Text style={styles.dataText}>Produkt ID: </Text>
                        <Text style={styles.dataText}>{delivery.product_id}</Text>
                    </View>

                    <View style={styles.flexRow2}>
                        <Text style={styles.dataText}>Produktnamn: </Text>
                        <Text style={styles.dataText}>{delivery.product_name}</Text>
                    </View>

                    <View style={styles.flexRow2}>
                        <Text style={styles.dataText}>Antal: </Text>
                        <Text style={styles.dataText}>{delivery.amount} st</Text>
                    </View>
                </View>

                <View style={styles.flexCol2}>
                    <Text style={styles.dataText}>Kommentar: </Text>
                    <Text style={styles.dataText}>{delivery.comment}</Text>
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
        alignSelf: 'center',
        width: '95%',
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
    text: {
        fontSize: theme.Typography.textSize,
        fontFamily: theme.Typography.btnFont2,
        color: theme.Colors.textColorDark,
    },
    dataText: {
        fontSize: theme.Typography.textSize,
        fontWeight: theme.Typography.textWeight,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
    },
    flexRow2: {
        width: '100%',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.Typography.whiteSpace25,
    },
    flexColumn3: {
        width: '100%',
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    flexCol2: {

    }
});

/**
 * Module exports.
 */
export default DeliveryListItem;
