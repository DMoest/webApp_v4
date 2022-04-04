import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from '../assets/themes/theme';


/**
 * StockListItem object to return a touchable link element to item detail view.
 *
 * @param navigation
 * @param item
 * @constructor
 */
const StockListItem = ({item}) => {
    return (
        <View key={item.id} style={[styles.listItem, styles.button]} >
            <Text style={styles.btnText}>{item.name}</Text>
            <Text style={styles.btnText}>{item.article_number}</Text>
            <Text style={styles.btnText}>{item.stock} st</Text>
        </View>
    )
}

/**
 * StockListItem object styles.
 */
const styles = StyleSheet.create({
    listItem: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        paddingHorizontal: theme.Typography.whiteSpace50,
        paddingVertical: theme.Typography.whiteSpace25,
        lineHeight: theme.Typography.lineHeight,
        fontSize: theme.Typography.textSize,
        fontFamily: theme.Typography.textFont,
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
    imgStatus: {
        width: 5,
        height: 5,

    },
});

/**
 * Module exports.
 */
export default StockListItem;
