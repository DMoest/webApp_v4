import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../assets/themes/theme';
// import statusFullIMG from '../assets/img/lager_status_full.png';
// import statusFewIMG from '../assets/img/lager_status_few.png';
// import statusEmptyIMG from '../assets/img/lager_status_empty.png';


/**
 * StockItem object to return a touchable link element to item detail view.
 *
 * @param navigation
 * @param item
 * @constructor
 */
const StockItem = ({navigation, item}) => {
    return (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
                navigation.navigate('StockItem', {item})
            }} >
            <View key={item.id} style={[styles.listItem, styles.button]} >
                <Text style={styles.btnText}>{item.name}</Text>
                <Text style={styles.btnText}>{item.article_number}</Text>
                {/*<Image source={StockItemStatus(item.stock)}/>*/}
                <Text style={styles.btnText}>{item.stock} st</Text>
            </View>
        </TouchableOpacity>
    )
}

// const StockItemStatus = ({stock}) => {
//     if (stock >= 10) {
//         return statusFullIMG;
//     } else if (stock <= 10 && stock > 0) {
//         return statusFewIMG;
//     } else if (stock == 0) {
//         return statusEmptyIMG;
//     }
// }

/**
 * StockItem object styles.
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
        fontWeight: theme.Typography.btnWeight,
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
export default StockItem;
