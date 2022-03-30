import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import config from "../config/config.json";
import {theme} from "../assets/themes/theme";
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';

const StockItem = ({route}) => {
    const [item, setItem] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${config.base_url}/products/${route.params.paramKey}?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setItem(result.data));
    }, []);

    return (
        <View style={[styles.container]}>
            <View style={styles.imgContainer}>
                <Image source={coverIMG} style={styles.image}/>
            </View>

            <Text style={styles.text}>{item.id}</Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.article_number}</Text>
            <Text style={styles.text}>{item.location}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text style={styles.text}>{item.specifiers}</Text>
            <Text style={styles.text}>{item.price}</Text>

            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.container.containerPaddingH,
    },
    base: {
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
        marginTop: theme.container.headerMarginT,
        marginBottom: theme.container.headerMarginB,
        color: theme.colors.textColorDark,
        fontSize: theme.typography.headerFontSize,
        fontFamily: theme.typography.headerFont,
        alignSelf: 'center'
    },
    subHeader: {
        alignSelf: 'center',
        marginTop: theme.container.subHeaderMarginT,
        marginBottom: theme.container.subHeaderMarginB,
        fontSize: theme.typography.subHeaderFontSize,
        color: theme.colors.textColorDark,
    },
    text: {
        fontSize: theme.typography.textFontSize,
        color: theme.colors.textColorDark,
    },
    button: {
        fontSize: theme.typography.btnSmallFontSize,
        paddingHorizontal: theme.container.btnPaddingH,
        paddingVertical: theme.container.btnPaddingV,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorDark,
    }
});

export default StockItem;
