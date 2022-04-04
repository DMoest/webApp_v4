import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../assets/themes/theme';
// import statusFullIMG from '../assets/img/lager_status_full.png';
// import statusFewIMG from '../assets/img/lager_status_few.png';
// import statusEmptyIMG from '../assets/img/lager_status_empty.png';


import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

/**
 * StockListItem object to return a touchable link element to item detail view.
 *
 * @param navigation
 * @param item
 * @constructor
 */
const StockListItem = ({navigation, item}) => {
    return (
        <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                    navigation.navigate('StockListItem', {item})
                }} >
                <View key={item.id} style={[styles.listItem, styles.button]} >
                    <Text style={styles.btnText}>{item.name}</Text>
                    <Text style={styles.btnText}>{item.article_number}</Text>
                    <Text style={styles.btnText}>{item.stock} st</Text>
                </View>
        </TouchableOpacity>
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
    btnContainer: {
        width: '95%',
        alignSelf: 'center',
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
