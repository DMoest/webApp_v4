import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {StockList} from "../components/StockList";
import {StockItem} from "./StockItem.screen";
import {StatusBar} from "expo-status-bar";
import coverIMG from "../assets/img/NutsAndBolts-5.jpg";
import {theme} from "../assets/themes/theme";


const Stack = createStackNavigator();

/**
 * Stock Stack Navigator.
 *
 * @constructor
 */
export const StockNavigator: React.FC = () => {
    return (
        <View style={styles.base}>
            {/* Image Header */}
            <View style={styles.imgContainer}>
                <ImageBackground source={coverIMG} style={styles.image}>
                    <Text style={styles.header}>Produkter</Text>
                </ImageBackground>
            </View>

            {/* Screen Content */}
            <View style={styles.container}>
                <Text style={[styles.text, styles.lastText]}>Listan innehåller lagerförda produkter. Varje produkt har ett namn, ett artikelnr. och antal i lager. </Text>

                <Stack.Navigator>
                    <Stack.Screen name='Produktkatalog' component={StockList} />
                    <Stack.Screen name='Produkt' component={StockItem} />
                </Stack.Navigator>
            </View>

            <StatusBar style='auto'/>
        </View>
    )
};

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
        backgroundColor: theme.Colors.white,
    },
    list: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        // flexWrap: 'wrap',
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
