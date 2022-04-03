import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import StockList from '../components/StockList';
import {theme} from '../assets/themes/theme';
import coverIMG from '../assets/img/NutsAndBolts-5.jpg';


/**
 * Stock screen/view.
 *
 * @constructor
 */
const Stock =() => {
    return (
        <View style={styles.base}>
            <View style={styles.imgContainer}>
                <ImageBackground source={coverIMG} style={styles.image}>
                    <Text style={styles.header}>Produkter</Text>
                </ImageBackground>
            </View>

            <View style={styles.container}>
                {/*<Text style={styles.subHeader}>Lagerförteckning</Text>*/}
                <Text style={[styles.text, styles.lastText]}>Listan innehåller lagerförda produkter. Varje produkt har ett namn, ett artikelnr. och antal i lager. </Text>

                <View style={styles.indicators}>
                    <Text style={styles.subHeader2}>Produkt</Text>
                    <Text style={styles.subHeader2}>Artikel Nr.</Text>
                    {/*<Text style={styles.subHeader2}>Status</Text>*/}
                    <Text style={styles.subHeader2}>Lager</Text>
                </View>

                <View style={styles.list}>
                    <StockList />
                </View>
            </View>

            <StatusBar style='auto'/>
        </View>
    );
}

/**
 * Stock object styles.
 */
const styles = StyleSheet.create({
    base: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: theme.Colors.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: theme.Typography.whiteSpace75,
        paddingVertical: theme.Typography.whiteSpace25,
    },
    list: {
        flex: 1,
        flexWrap: 'wrap',
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.Container.basePaddingV,
        paddingHorizontal: theme.Container.basePaddingH,
    },
    imgContainer: {
        alignItems: 'center',
        width: theme.Images.coverWidth,
        height: theme.Images.coverHeight,
        marginBottom: theme.Typography.whiteSpace200
    },
    image: {
        width: '100%',
        height: undefined,
        flex: 1,
        aspectRatio: theme.Images.coverAspectRation,
    },
    header: {
        width: '100%',
        height: undefined,
        paddingVertical: theme.Typography.whiteSpace200,
        paddingHorizontal: theme.Typography.whiteSpace50,
        textAlign: 'center',
        fontSize: theme.Typography.h1Size,
        fontWeight: theme.Typography.h1Weight,
        fontFamily: theme.Typography.headerFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorLight,
    },
    subHeader: {
        alignSelf: 'center',
        marginBottom: theme.Typography.whiteSpace,
        fontSize: theme.Typography.h3Size,
        fontWeight: theme.Typography.h3Weight,
        fontFamily: theme.Typography.subHeaderFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
    subHeader2: {
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: theme.Typography.whiteSpace25,
        fontSize: theme.Typography.h5Size,
        fontWeight: theme.Typography.h5Weight,
        fontFamily: theme.Typography.subHeaderFont,
        lineHeight: theme.Typography.lineHeight,
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
        marginBottom: theme.Typography.whiteSpace,
    },
    button: {
        width: '100%',
        height: undefined,
        overflow: 'hidden',
        paddingHorizontal: theme.Typography.whiteSpace,
        paddingVertical: theme.Typography.whiteSpace50,
        fontSize: theme.Typography.h5Size,
        fontWeight: theme.Typography.h2Weight,
        fontFamily: theme.Typography.btnFont,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
        backgroundColor: theme.Colors.primaryColor,
        borderRadius: theme.Container.bthRadius,
    },
});

/**
 * Module exports.
 */
export default Stock;
