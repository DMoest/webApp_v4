import React from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image} from 'react-native';
import StockList from '../components/StockList';
import {theme} from "../assets/themes/theme";
import coverIMG from "../assets/img/NutsAndBolts-5.jpg";

const Stock =() => {
    return (
        <View style={styles.base}>
            <Text style={styles.header}>Produkter</Text>
            <View style={styles.imgContainer}>
                <Image source={coverIMG} style={styles.image}/>
            </View>

            <View style={styles.content}>
                <Text style={styles.subHeader}>Lagerförteckning</Text>
                <StockList />
            </View>

            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    content: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.container.basePaddingH,
    },
    imgContainer: {
        width: theme.images.coverWidth,
        height: theme.images.coverHeight,
    },
    image: {
        flex: 1,
        aspectRatio: theme.images.coverAspectRation,
        width: '100%',
        height: undefined,
    },
    header: {
        fontSize: theme.typography.headerFontSize,
        marginTop: theme.container.headerMarginT,
        marginBottom: theme.container.headerMarginB,
        color: theme.colors.textColorDark,
        alignSelf: 'center'
    },
    subHeader: {
        fontSize: theme.typography.subHeaderFontSize,
        marginTop: theme.container.subHeaderMarginT,
        marginBottom: theme.container.subHeaderMarginB,
        color: theme.colors.textColorDark,
        alignSelf: 'center'
    },
    button: {
        width: '100%',
        fontSize: theme.typography.btnSmallFontSize,
        paddingHorizontal: theme.container.btnPaddingH,
        paddingVertical: theme.container.btnPaddingV,
        marginHorizontal: theme.container.btnMarginH,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorDark,
    }
});

export default Stock;
