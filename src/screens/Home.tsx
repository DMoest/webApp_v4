import React from "react";
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView} from 'react-native';
import {theme} from "../assets/themes/theme";
import coverIMG from "../assets/img/NutsAndBolts-4.jpg";


/**
 * Home screen/view.
 * @param navigation
 * @constructor
 */
const Home = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.base]}>
            <View style={styles.imgContainer}>
                <ImageBackground source={coverIMG} style={styles.image}>
                    <Text style={styles.header}>Infinity Warehouses</Text>
                </ImageBackground>
            </View>

            <View style={[styles.container, styles.content]}>
                <Text style={styles.text}>Välkommen till vår fiktiva mobila lagerapp. Idag lagrar vi skruv och skrot, imorgon kanske något helt annat och den som lever då får se. Hoppas ni trivs med att använda vår app och hittar något riktigt rostigt. </Text>
                <Text style={[styles.text, styles.lastText]}>För tillfället kan ni endast se våra lagrade produkter men innom kort tillkommer fler funktioner. </Text>

                <TouchableOpacity
                    style={[styles.btnContainer]}
                    onPress={() => {navigation.navigate('StockList')}}>
                    <Text style={styles.button}>Produkter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btnContainer]}
                    onPress={() => {navigation.navigate('OrderList')}}>
                    <Text style={styles.button}>Orderlista</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

/**
 * Home view styles.
 */
const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: theme.Colors.white,
    },
    imgContainer: {
        alignItems: 'center',
        width: theme.Images.coverWidth,
        height: theme.Images.coverHeight,
        marginBottom: 14,
    },
    image: {
        flex: 1,
        aspectRatio: theme.Images.coverAspectRation,
        width: '100%',
        height: undefined,
    },
    container: {
        flex: 1,
        backgroundColor: theme.Colors.white
    },
    content: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.containerPaddingH,
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
        overflow: 'hidden',
        width: '100%',
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        marginVertical: theme.Container.btnMarginV,
        borderRadius: theme.Container.bthRadius,
        fontSize: theme.Typography.btnBigFontSize,
        fontWeight: theme.Typography.btnWeight,
        fontFamily: theme.Typography.btnFont,
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    },
    header: {
        alignSelf: 'center',
        paddingVertical: theme.Container.headerPaddingV,
        color: theme.Colors.textColorLight,
        fontSize: theme.Typography.headerFontSize,
        fontFamily: theme.Typography.headerFont,
    },
    subHeader: {
        paddingVertical: theme.Container.subHeaderPaddingV,
        color: theme.Colors.textColorDark,
        fontSize: theme.Typography.subHeaderFontSize,
        fontFamily: theme.Typography.subHeaderFont,
    },
    text: {
        width: '100%',
        height: undefined,
        fontSize: theme.Typography.textFontSize,
        fontFamily: theme.Typography.textFont,
        paddingHorizontal: theme.Container.containerPaddingH,
        paddingVertical: theme.Container.containerPaddingV,
    },
    lastText: {
        marginBottom: 14,
    }
});

/**
 * Module exports.
 */
export default Home;
