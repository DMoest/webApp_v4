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

            <View style={styles.container}>
                <Text style={styles.text}>Det här är ett fiktivt lager för kursen WebApp.</Text>
                <View style={[styles.content]}>
                    <TouchableOpacity
                        style={[styles.btnContainer]}
                        onPress={() => {navigation.navigate('StockList')}}>
                        <Text style={styles.button}>Produkter</Text>
                    </TouchableOpacity>
                </View>
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
    content: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.containerPaddingH,
    },
    container: {
        flex: 1,
        backgroundColor: theme.Colors.white
    },
    imgContainer: {
        alignItems: 'center',
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
        paddingVertical: theme.Container.headerPaddingV,
        color: theme.Colors.textColorLight,
        fontSize: theme.Typography.headerFontSize,
        fontFamily: theme.Typography.headerFont,
    },
    text: {
        fontSize: theme.Typography.textFontSize,
        fontFamily: theme.Typography.textFont,
        paddingHorizontal: theme.Container.containerPaddingH,
        paddingVertical: theme.Container.containerPaddingV,
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
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    },
});

/**
 * Module exports.
 */
export default Home;
