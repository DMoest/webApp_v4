import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import OrderList from '../components/OrderList';
import {theme} from '../assets/themes/theme';
import coverIMG from '../assets/img/NutsAndBolts-5.jpg';


/**
 * Order screen/view.
 *
 * @constructor
 */
const Order =() => {
    return (
        <View style={styles.base}>
            <View style={styles.imgContainer}>
                <ImageBackground source={coverIMG} style={styles.image}>
                    <Text style={styles.header}>Orderlista</Text>
                </ImageBackground>
            </View>

            <View style={styles.content}>
                <Text style={styles.subHeader}>Orderlista</Text>

                <View style={styles.listDescription}>
                    <Text style={styles.btnText}>Order ID</Text>
                    <Text style={styles.btnText}>Beställare</Text>
                    <Text style={styles.btnText}>Status Kod</Text>
                </View>

                <View style={styles.list}>
                    <OrderList />
                </View>
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
    content: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.basePaddingH,
    },
    list: {
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: theme.Container.containerMarginB,
    },
    listDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: theme.Container.basePaddingV,
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
    imgStatus: {
        flex: 1,
        aspectRatio: 18/10,
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    header: {
        alignSelf: 'center',
        paddingVertical: theme.Container.headerPaddingV,
        color: theme.Colors.textColorLight,
        fontSize: theme.Typography.headerFontSize,
        fontFamily: theme.Typography.headerFont,
    },
    subHeader: {
        alignSelf: 'center',
        marginTop: theme.Container.subHeaderMarginT,
        marginBottom: theme.Container.subHeaderMarginB,
        fontSize: theme.Typography.subHeaderFontSize,
        fontFamily: theme.Typography.subHeaderFont,
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
        fontFamily: theme.Typography.textFont,
        fontWeight: theme.Typography.btnWeight,
        lineHeight: theme.Typography.textLineHeight,
        color: theme.Colors.textColorDark,
    },
});

/**
 * Module exports.
 */
export default Order;
