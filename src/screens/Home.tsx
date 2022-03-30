import React from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions} from 'react-native';
import {theme} from "../assets/themes/theme";
import wrapperIMG from "../assets/img/NutsAndBolts-4.jpg";

const Home = ({navigation}) => {
    return (
        <View style={[styles.base]}>
            <Text style={styles.header}>Infinity Warehouses</Text>
            <View style={styles.imgContainer}>
                <Image source={wrapperIMG} style={styles.image}/>
            </View>

            <View style={styles.container}>
                <Text>Det här är ett fiktivt lager för kursen WebApp.</Text>

                <TouchableOpacity onPress={() => {navigation.navigate('Stocks')}}>
                    <Text style={[styles.button]}>Produkter</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.white
        // paddingHorizontal: 12,
    },
    imgContainer: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width / 16 * 6,
    },
    image: {
        flex: 1,
        aspectRatio: 16/6,
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
    button: {
        overflow: 'hidden',
        width: '100%',
        paddingHorizontal: theme.container.btnPaddingH,
        paddingVertical: theme.container.btnPaddingV,
        marginVertical: theme.container.btnMarginV,
        borderRadius: theme.container.bthRadius,

        fontSize: theme.typography.btnFontSize,
        fontWeight: theme.typography.btnWeight,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorDark,
    },
});

export default Home;
