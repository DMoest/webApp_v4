import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {theme} from "../assets/themes/theme";


/**
 * StockListItem screen/view.
 *
 * @param route
 * @constructor
 */
export const OrderItem: React.FC = ({route}) => {
    const item = route.params.item

    // console.log("ORDER: ", item)

    return (
        <View style={[styles.container]}>
            <View style={styles.container}>
                <Text style={styles.text}>{item.id}</Text>
                <Text style={styles.text}>{item.status}</Text>
                <Text style={styles.text}>{item.status_id}</Text>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.address}</Text>
                <Text style={styles.text}>{item.zip}</Text>
                <Text style={styles.text}>{item.city}</Text>
            </View>

            {/* TODO Gör en lista av alla produkter som tillhör ordern */}

            <StatusBar style="auto"/>
        </View>
    );
}

/**
 * StockListItem styles.
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
