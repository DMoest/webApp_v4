import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {theme} from "../assets/themes/theme";



/**
 * StockListItem screen/view.
 *
 * @param route
 * @constructor
 */
export const StockItem: React.FC = ({route}) => {
    const item = route.params.item

    return (
        <View style={[styles.container]}>
            <Text style={styles.subHeader}>{item.name}</Text>

            <View style={styles.flexRow}>
                <Text style={[styles.text, {flex: 1}]}>ID: </Text>
                <Text style={[styles.data, {flex: 2, flexWrap: 'wrap'}]}>{item.id}</Text>
            </View>

            <View style={styles.flexRow}>
                <Text style={[styles.text, {flex: 1}]}>Artikel nr: </Text>
                <Text style={[styles.data, {flex: 2, flexWrap: 'wrap'}]}>{item.article_number}</Text>
            </View>

            <View style={styles.flexRow}>
                <Text style={[styles.text, {flex: 1}]}>Plats: </Text>
                <Text style={[styles.data, {flex: 2, flexWrap: 'wrap'}]}>{item.location}</Text>
            </View>

            <View style={styles.flexRow}>
                <Text style={[styles.text, {flex: 1}]}>Pris: </Text>
                <Text style={[styles.data, {flex: 2, flexWrap: 'wrap'}]}>{item.price} kr</Text>
            </View>

            <View style={styles.flexRow}>
                <Text style={[styles.text, {flex: 1}]}>Beskrivning: </Text>
                <Text style={[styles.data, {flex: 2, flexWrap: 'wrap'}]}>{item.description}</Text>
            </View>

            <View style={styles.flexRow}>
                <Text style={[styles.text, {flex: 1}]}>Specifikation: </Text>
                <Text style={[styles.data, {flex: 2, flexWrap: 'wrap'}]}>{item.specifiers}</Text>
            </View>

            <StatusBar style="auto"/>
        </View>
    );
}

/**
 * StockListItem styles.
 */
const styles = StyleSheet.create({
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
        alignSelf: 'center',
        marginTop: theme.Container.headerMarginT,
        marginBottom: theme.Container.headerMarginB,
        fontSize: theme.Typography.h1Size,
        fontFamily: theme.Typography.headerFont,
        color: theme.Colors.textColorDark,
    },
    subHeader: {
        alignSelf: 'center',
        marginTop: theme.Container.subHeaderMarginT,
        marginBottom: theme.Container.subHeaderMarginB,
        fontSize: theme.Typography.h4Size,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    text: {
        textAlign: 'left',
        fontSize: theme.Typography.textSize,
        fontWeight: theme.Typography.textWeight,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    data: {
        textAlign: 'right',
        fontSize: theme.Typography.textSize,
        fontWeight: theme.Typography.textWeight,
        fontFamily: theme.Typography.textFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    button: {
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        fontSize: theme.Typography.btnSmallFontSize,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
        backgroundColor: theme.Colors.primaryColor,
    },
    flexRow: {
        width: '100%',
        height: undefined,
        paddingVertical: theme.Typography.whiteSpace25,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    }
});
