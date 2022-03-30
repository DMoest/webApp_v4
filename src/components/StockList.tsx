import React from "react";
import {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import config from "../config/config.json";
import {theme} from "../assets/themes/theme";

const StockList = ({navigation}) => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    const StockItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('StockItem', {
                        id: item.id,
                        name: item.name,
                        stock: item.stock,
                    })
                }} >
                <View key={item.id} style={[styles.listItem, styles.button]} >
                    <Text>{item.name}</Text>
                    <Text>{item.stock} st</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <FlatList data={products}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                          <StockItem item={item}/>
                      )} />
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    listItem: {
        overflow: 'hidden',
        backgroundColor: theme.colors.white,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: theme.colors.gray4,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: -2,
            height: 4
        },
        shadowRadius: 3,
        color: theme.colors.textColorDark,
        fontFamily: theme.typography.textFont,
    },
    header: {
        color: theme.colors.textColorDark,
        fontSize: 24,
        marginBottom: 24,
        fontFamily: theme.typography.headerFont,
    },
    textPadding: {
        paddingTop: 5,
        paddingBottom: 20,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorLight,
        fontFamily: theme.typography.btnFont
    }
});

export default StockList;
