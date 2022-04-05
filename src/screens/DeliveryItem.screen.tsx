import React from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from "../assets/themes/theme";


/**
 * DeliveryListItem screen/view.
 *
 * @param route
 * @constructor
 */
export const DeliveryItem: React.FC = ({route}) => {
    const item = route.params.item

    console.log("ITEM: ", item)

    return (
        <View style={[styles.container]}>
                <Text style={styles.text}>{item.id}</Text>
                <Text style={styles.text}>{item.product_id}</Text>
                <Text style={styles.text}>{item.product_name}</Text>
                <Text style={styles.text}>{item.amount}</Text>
                <Text style={styles.text}>{item.comment}</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

/**
 * DeliveryListItem styles.
 */
const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    container: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.containerPaddingH,
    },
    base: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.basePaddingH,
    },
    imgContainer: {
        width: theme.Images.coverWidth,
        height: theme.Images.coverHeight,
    },
    image: {
        flex: 1,
        aspectRatio: theme.Images.coverAspectRation,
        width: '100%',
        height: undefined,
    },
    header: {
        marginTop: theme.Container.headerMarginT,
        marginBottom: theme.Container.headerMarginB,
        color: theme.Colors.textColorDark,
        fontSize: theme.Typography.h1Size,
        fontFamily: theme.Typography.headerFont,
        alignSelf: 'center'
    },
    subHeader: {
        alignSelf: 'center',
        marginTop: theme.Container.subHeaderMarginT,
        marginBottom: theme.Container.subHeaderMarginB,
        fontSize: theme.Typography.h3Size,
        color: theme.Colors.textColorDark,
    },
    text: {
        fontSize: theme.Typography.textSize,
        color: theme.Colors.textColorDark,
    },
    button: {
        fontSize: theme.Typography.btnSmallFontSize,
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    }
});
