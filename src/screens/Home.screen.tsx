import React from "react";
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView} from 'react-native';
import {theme} from "../assets/themes/theme";
import coverIMG from "../assets/img/NutsAndBolts-4.jpg";


/**
 * Home screen/view.
 * @param navigation
 * @constructor
 */
export const Home: React.FC = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.base]}>
            <View style={styles.imgContainer}>
                <ImageBackground source={coverIMG} style={styles.image}>
                    <Text style={styles.header}>Infinity</Text>
                </ImageBackground>
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Välkommen till vår fiktiva mobila lagerapp. Idag lagrar vi skruv och skrot, imorgon kanske något helt annat och den som lever då får se. Hoppas ni trivs med att använda vår app och hittar något riktigt rostigt. </Text>
                <Text style={[styles.text, styles.lastText]}>För tillfället finns endast begränsad funktionalitet men inom kort tillkommer mer. </Text>
            </View>
        </SafeAreaView>
    )
}

/**
 * Home view styles.
 */
const styles = StyleSheet.create({
    base: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: theme.Colors.white,
    },
    container: {
        paddingHorizontal: theme.Typography.whiteSpace25,
    },
    imgContainer: {
        alignItems: 'center',
        width: theme.Images.coverWidth,
        height: theme.Images.coverHeight,
        marginBottom: theme.Typography.whiteSpace200
    },
    image: {
        flex: 1,
        aspectRatio: theme.Images.coverAspectRation,
        width: '100%',
        height: undefined,
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
        height: undefined,
        overflow: 'hidden',
        paddingHorizontal: theme.Typography.whiteSpace,
        paddingVertical: theme.Typography.whiteSpace50,
        marginVertical: theme.Typography.whiteSpace50,
        fontSize: theme.Typography.h5Size,
        fontWeight: theme.Typography.h2Weight,
        fontFamily: theme.Typography.btnFont,
        color: theme.Colors.textColorDark,
        backgroundColor: theme.Colors.primaryColor,
        borderRadius: theme.Container.bthRadius,
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
        marginBottom: theme.Typography.whiteSpace200,
    }
});
