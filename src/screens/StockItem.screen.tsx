import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import config from "../config/config.json";
import {theme} from "../assets/themes/theme";
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';


/**
 * StockListItem screen/view.
 *
 * @param route
 * @constructor
 */
const StockItem: React.FC = ({route}) => {
    const item = route.params.item

    return (
        <View style={[styles.container]}>
            <View style={styles.container}>
                <Text style={styles.subHeader}>{item.name}</Text>

                <View style={styles.flexRow2}>
                    <Text style={[styles.text]}>ID: </Text>
                    <Text style={[styles.data]}>{item.id}</Text>
                </View>

                <View style={styles.flexRow2}>
                    <Text style={[styles.text]}>Artikel nr: </Text>
                    <Text style={[styles.data]}>{item.article_number}</Text>
                </View>

                <View style={styles.flexRow2}>
                    <Text style={[styles.text]}>Plats: </Text>
                    <Text style={[styles.data]}>{item.location}</Text>
                </View>

                <View style={styles.flexRow2}>
                    <Text style={[styles.text]}>Pris: </Text>
                    <Text style={[styles.text]}>{item.price} kr</Text>
                </View>

                <View style={styles.flexRow2}>
                    <Text style={[styles.text]}>Beskrivning: </Text>
                    <Text style={[styles.data]}>{item.description}</Text>
                </View>

                <View style={styles.flexRow2}>
                    <Text style={[styles.text]}>Specifikation: </Text>
                    <Text style={[styles.data]}>{item.specifiers}</Text>
                </View>
            </View>

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
        textAlign: 'left',
        fontSize: theme.Typography.textSize,
        fontWeight: theme.Typography.textWeight,
        fontFamily: theme.Typography.textFont,
        color: theme.Colors.textColorDark,
    },
    data: {
        textAlign: 'right',
        fontSize: theme.Typography.textSize,
        fontWeight: theme.Typography.textWeight,
        fontFamily: theme.Typography.textFont,
        color: theme.Colors.textColorDark,
    },
    button: {
        fontSize: theme.Typography.btnSmallFontSize,
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    },
    flexRow2: {
        width: '100%',
        height: undefined,
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

/**
 * Module exports.
 */
export default StockItem;
