import React from "react";
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import config from "../config/config.json";
import {theme} from "../assets/themes/theme";

const StockList = ({navigation}) => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    const StockItemLink = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                    navigation.navigate('StockItem')
                }} >
                <View key={item.id} style={[styles.listItem, styles.button]} >
                    <Text style={styles.btnText}>{item.name}</Text>
                    <Text style={styles.btnText}>{item.stock} st</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <FlatList data={products}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                          <StockItemLink item={item}/>
                      )} />
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: theme.colors.white,
        borderRadius: theme.container.bthRadius,
        paddingHorizontal: theme.container.btnPaddingH,
        paddingVertical: theme.container.btnPaddingV,
        marginBottom: theme.container.btnSmallMarginB,
        color: theme.colors.textColorDark,
        fontFamily: theme.typography.textFont,
    },
    header: {
        color: theme.colors.textColorDark,
        fontSize: theme.typography.headerFontSize,
        marginBottom: theme.container.headerMarginB,
        fontFamily: theme.typography.headerFont,
    },
    textPadding: {
        paddingTop: theme.container.textPaddingT,
        paddingBottom: theme.container.textPaddingB,
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
        marginBottom: theme.container.btnSmallMarginB,
        borderRadius: theme.container.bthRadius,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorDark,
    },
    btnText: {
        fontSize: theme.typography.btnSmallFontSize,
        fontWeight: theme.typography.btnWeight,
        color: theme.colors.textColorDark,
    },
});

export default StockList;
