/**
 * Module imports.
 */
import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useAppContext} from '../../context/App.provider';
import {useNavigation} from "@react-navigation/native";
import {InvoiceListItem} from "./InvoiceListItem";
import * as InvoiceModel from '../../models/Invoices';
import * as Style from "../../assets/styles";
import AppLoading from "expo-app-loading";


/**
 * Invoice list component.
 * @constructor
 */
export const InvoiceList: React.FC = () => {
    const appContext = useAppContext();
    const navigation = useNavigation();

    useEffect(() => {
        const loadInvoices = async () => {
            appContext.setInvoices(await InvoiceModel.getInvoices());
        }

        loadInvoices();
    }, []);

    const renderItem = ({item}) => (
        <TouchableOpacity
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Fakturaspecifikation', {item});
            }}>
            <InvoiceListItem item={item}/>
        </TouchableOpacity>
    );

    if (appContext.isLoading) {
        return <AppLoading/>;
    }

    if (appContext.invoices) {
        return (
            <FlatList
                style={Style.Container.flatList}
                data={appContext.invoices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        );
    } else {
        return (
            <View>
                <Text>Inga fakturor hittades.</Text>
            </View>
        );
    }
};
