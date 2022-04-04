import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {DeliveryList} from '../components/DeliveryList';
import {DeliveryItem} from './DeliveryItem.screen';
import { StatusBar } from 'expo-status-bar';
import coverIMG from '../assets/img/NutsAndBolts-6.jpg';
import {theme} from '../assets/themes/theme';



const Stack = createStackNavigator();

/**
 * Delivery screen/view.
 *
 * @constructor
 */
export const DeliveryNavigator: React.FC =() => {
    return (
        <View style={styles.base}>
            <View style={styles.imgContainer}>
                <ImageBackground source={coverIMG} style={styles.image}>
                    <Text style={styles.header}>Leveranser</Text>
                </ImageBackground>
            </View>

            <View style={styles.content}>
                {/*<Text style={styles.subHeader}>Inkommande Leveranser</Text>*/}
                <Text style={[styles.text, styles.lastText]}>Listan innehåller samtliga inkommande leveraser. En leverans har ett id, ett datum, ett produkt-id, ett produktnamn och antal beställda av produkten. Sist finns en kommentar som tillhör leveransen. </Text>

                {/*<View style={styles.listDescription}>*/}
                {/*    <Text style={styles.subHeader2}>Leverans ID</Text>*/}
                {/*    <Text style={styles.subHeader2}>Datum</Text>*/}
                {/*</View>*/}

                <View style={styles.list}>
                    <Text style={[styles.text, styles.lastText]}>Listan innehåller lagerförda produkter. Varje produkt har ett namn, ett artikelnr. och antal i lager. </Text>

                    <Stack.Navigator>
                        <Stack.Screen name='Leveranslista' component={DeliveryList} />
                        <Stack.Screen name='Leverans' component={DeliveryItem} />
                    </Stack.Navigator>
                </View>
            </View>

            <StatusBar style='auto'/>
        </View>
    );
}

/**
 * Delivery object styles.
 */
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: theme.Colors.white,
    },
    content: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.basePaddingH,
    },
    list: {
        flex: 1,
        // flexWrap: 'wrap',
        // marginBottom: theme.Container.containerMarginB,
    },
    listDescription: {
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
        flex: 1,
        aspectRatio: theme.Images.coverAspectRation,
        width: '100%',
        height: undefined,
    },
    header: {
        alignSelf: 'center',
        paddingVertical: theme.Typography.whiteSpace200,
        color: theme.Colors.textColorLight,
        fontSize: theme.Typography.h1Size,
        fontFamily: theme.Typography.headerFont,
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
    button: {
        width: '100%',
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        marginHorizontal: theme.Container.btnMarginH,
        fontSize: theme.Typography.btnSmallFontSize,
        fontFamily: theme.Typography.btnFont,
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    },
    btnText: {
        fontSize: theme.Typography.btnSmallFontSize,
        fontFamily: theme.Typography.btnFont2,
        fontWeight: theme.Typography.btnWeight,
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
    }
});
