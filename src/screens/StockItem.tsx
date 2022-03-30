import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import Stock from '../components/StockList';
import warehouse from '../assets/img/warehouse.jpg';
import {theme} from "../assets/themes/theme";

const StockItem = ({item}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container]}>

                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.id}</Text>
                <Text style={styles.text}>{item.location}</Text>
                <Text style={styles.text}>{item.price}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.text}>{item.article_number}</Text>
                <Text style={styles.text}>{item.specifiers}</Text>

                <StatusBar style="auto"/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 12,
    },
    base: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 12,
    },
    header: {
        fontSize: 42,
        marginTop: 21,
        marginBottom: 42,
        color: theme.colors.textColorDark,
        alignSelf: 'center'
    },
    subHeader: {
        fontSize: 21,
        marginTop: 21,
        marginBottom: 42,
        color: theme.colors.textColorDark,
        alignSelf: 'center'
    },
    text: {
        fontSize: 12,
        color: theme.colors.textColorDark,
    },
    image: {
        width: '100%',
        minHeight: 200,
        alignSelf: 'center',
    },
    button: {
        fontSize: theme.typography.btnFontSize,
        paddingHorizontal: 16,
        paddingVertical: 9,
        backgroundColor: theme.colors.primaryColor,
        color: theme.colors.textColorDark,
    }
});

export default StockItem;
