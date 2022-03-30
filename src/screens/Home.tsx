import React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {theme} from "../assets/themes/theme";
import coverIMG from "../assets/img/NutsAndBolts-4.jpg";

const Home = ({navigation}) => {
    return (
        <View style={[styles.base]}>
            <Text style={styles.header}>Infinity Warehouses</Text>
            <View style={styles.imgContainer}>
                <Image source={coverIMG} style={styles.image}/>
            </View>

            <View style={styles.container}>
                <Text>Det här är ett fiktivt lager för kursen WebApp.</Text>
                <View style={[styles.content]}>
                    <TouchableOpacity
                        style={[styles.btnContainer]}
                        onPress={() => {navigation.navigate('StockList')}}>
                        <Text style={[styles.button]}>Produkter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    content: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.container.containerPaddingH,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.white
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
        alignSelf: 'center',
        marginTop: theme.container.headerMarginT,
        marginBottom: theme.container.headerMarginB,
        color: theme.colors.textColorDark,
        fontSize: theme.typography.headerFontSize,
        fontFamily: theme.typography.headerFont,
    },
    btnContainer: {
        width: '100%',
        shadowColor: theme.colors.shadows,
        shadowOffset: theme.abstracts.btnOffset,
        shadowOpacity: theme.abstracts.btnOpacity,
        shadowRadius: theme.abstracts.btnRadius,
        elevation: theme.abstracts.btnElevation,
    },
    button: {
        overflow: 'hidden',
        width: '100%',
        paddingHorizontal: theme.container.btnPaddingH,
        paddingVertical: theme.container.btnPaddingV,
        marginVertical: theme.container.btnMarginV,
        borderRadius: theme.container.bthRadius,

        fontSize: theme.typography.btnBigFontSize,
        fontWeight: theme.typography.btnWeight,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorDark,
    },
});

export default Home;
