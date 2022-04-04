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
export const OrderListItem = ({item}) => {
    return (
        <View key={item.id} style={[styles.listItem, styles.button]}>
            <View style={styles.idContainer}>
                <Text style={styles.btnText}>{item.id}</Text>
                <Text style={styles.btnText}>{item.name}</Text>

                <Text style={styles.btnText}>{item.status_id}</Text>
            </View>

            <View style={styles.address_container}>
                <Text style={styles.dataText}>{item.address}</Text>

                <View style={styles.zipCodeAndCity}>
                    <Text style={styles.dataText}>{item.zip}</Text>
                    <Text style={[styles.dataText, styles.city]}>{item.city}</Text>
                </View>

                <Text style={styles.dataText}>{item.country}</Text>
            </View>
        </View>
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
        width: '95%',
        alignSelf: 'center',
        marginHorizontal: theme.Typography.whiteSpace75,
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
    text: {
        width: '100%',
        height: undefined,
        paddingHorizontal: theme.Typography.whiteSpace50,
        paddingVertical: theme.Typography.whiteSpace50,
        textAlign: 'left',
        lineHeight: theme.Typography.lineHeight,
        fontSize: theme.Typography.textSize,
        fontWeight: theme.Typography.textWeight,
        fontFamily: theme.Typography.textFont,
    },
    lastText: {
        marginBottom: theme.Typography.whiteSpace200,
    },
    btnText: {
        fontSize: theme.Typography.btnSmallFontSize,
        fontFamily: theme.Typography.btnFont2,
        color: theme.Colors.textColorDark,
    },
    dataText: {
        textAlign: 'left',
        fontSize: theme.Typography.smallFontSize,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
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
