import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import config from "../config/config.json";
import {theme} from "../assets/themes/theme";
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';


/**
 * StockItem screen/view.
 *
 * @param route
 * @constructor
 */
const StockItem = ({route}) => {
    // const [item, setItem] = useState<any[]>([]);

    // useEffect(() => {
    //     fetch(`${config.base_url}/products/${route.params.paramKey}?api_key=${config.api_key}`)
    //         .then(response => response.json())
    //         .then(result => setItem(result.data));
    // }, []);

    return (
        <View style={[styles.container]}>
            <View style={styles.imgContainer}>
                <Image source={coverIMG} style={styles.image}/>
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>{item.id}</Text>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.article_number}</Text>
                <Text style={styles.text}>{item.location}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.text}>{item.specifiers}</Text>
                <Text style={styles.text}>{item.price}</Text>
            </View>

            <StatusBar style="auto"/>
        </View>
    );
}

/**
 * StockItem styles.
 */
const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    container: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.containerPaddingH,
    },
    base: {
        flex: 1,
        backgroundColor: theme.Colors.white,
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
    header: {
        marginTop: theme.Container.headerMarginT,
        marginBottom: theme.Container.headerMarginB,
        color: theme.Colors.textColorDark,
        fontSize: theme.Typography.headerFontSize,
        fontFamily: theme.Typography.headerFont,
        alignSelf: 'center'
    },
    subHeader: {
        alignSelf: 'center',
        marginTop: theme.Container.subHeaderMarginT,
        marginBottom: theme.Container.subHeaderMarginB,
        fontSize: theme.Typography.subHeaderFontSize,
        color: theme.Colors.textColorDark,
    },
    text: {
        fontSize: theme.Typography.textFontSize,
        color: theme.Colors.textColorDark,
    },
    button: {
        fontSize: theme.Typography.btnSmallFontSize,
        paddingHorizontal: theme.Container.btnPaddingH,
        paddingVertical: theme.Container.btnPaddingV,
        backgroundColor: theme.Colors.primaryColor,
        color: theme.Colors.textColorDark,
    }
});

/**
 * Module exports.
 */
export default StockItem;
