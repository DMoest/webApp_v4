import React from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, ScrollView, Image, SafeAreaView, Dimensions} from 'react-native';
import StockList from '../components/StockList';
import coverIMG from "../assets/img/NutsAndBolts-5.jpg";
import {theme} from "../assets/themes/theme";

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
        paddingHorizontal: (Dimensions.get('screen').width / 100) * 3,
    },
    imgContainer: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width / 16 * 6,
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
        fontSize: theme.typography.btnFontSize,
        width: '100%',
        paddingHorizontal: theme.container.btnPaddingH,
        paddingVertical: theme.container.btnPaddingV,
        marginHorizontal: theme.container.btnMarginH,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorDark,
    }
});

export default Stock;
