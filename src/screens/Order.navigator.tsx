import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {StatusBar} from 'expo-status-bar';
import {OrderList} from '../components/OrderList';
import {OrderItem} from "./OrderItem.screen";
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';
import {theme} from '../assets/themes/theme';


const Stack = createStackNavigator();

/**
 * Order Stack Navigator.
 *
 * @constructor
 */
export const OrderNavigator: React.FC =() => {
    return (
        <View style={styles.base}>
            <View style={styles.imgContainer}>
                <ImageBackground source={coverIMG} style={styles.image}>
                    <Text style={styles.header}>Orderlista</Text>
                </ImageBackground>
            </View>

            <View style={[styles.container]}>
                <Text style={[styles.text]}>Den här listan innehåller utgående ordrar till kund. Varje order ska innehålla ett id, en order status kod och en beställare. </Text>

                <Stack.Navigator>
                    <Stack.Screen name='Orderlista' component={OrderList} />
                    <Stack.Screen name='Order' component={OrderItem} />
                </Stack.Navigator>
            </View>

            <StatusBar style='auto'/>
        </View>
    );
}

/**
 * Order object styles.
 */
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: theme.Colors.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: theme.Typography.whiteSpace75,
        // paddingVertical: theme.Typography.whiteSpace,
        backgroundColor: theme.Colors.white,
    },
    list: {
        flex: 1,
        // flexWrap: 'wrap',
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
        fontFamily: theme.Typography.textFont,
        fontWeight: theme.Typography.btnWeight,
        lineHeight: theme.Typography.lineHeight,
        color: theme.Colors.textColorDark,
    },
});
