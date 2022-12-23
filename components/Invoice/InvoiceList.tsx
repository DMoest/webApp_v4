/**
 * Module imports.
 */
import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppContext} from '../../context/App.provider';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import {InvoiceListItem} from './InvoiceListItem';
import * as InvoiceModel from '../../models/Invoices';
import * as InvoiceInterfaces from '../../interfaces/Invoice';
import * as Style from '../../assets/styles';

/**
 * Invoice list component.
 * @constructor
 */
export const InvoiceList: React.FC = () => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? false;

    /**
     * Hook to fetch invoices
     */
    useEffect(() => {
        if (reload === true) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.log(
                `*> Route ${route.name} ~> useEffect HOOK RELOAD ~> ${reload}`,
            );

            void loadInvoices().then(() => {
                // Set RELOAD to false.
                // eslint-disable-next-line react-hooks/exhaustive-deps
                reload = false;

                // Set isRefreshing to false.
                appContext.setIsRefreshing(false);
            });
        } else {
            appContext.setIsRefreshing(false);
        }
    }, [reload]);

    async function loadInvoices() {
        try {
            appContext.setIsRefreshing(true);
            appContext.setInvoices(await InvoiceModel.getInvoices());
        } catch (error) {
            console.warn(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    }

    /**
     * Render InvoiceItem function.
     *
     * @param item
     */
    const renderItem = ({ item }: InvoiceInterfaces.Invoice) => (
        <TouchableOpacity
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Fakturaspecifikation', { item });
            }}>
            <InvoiceListItem item={item} />
        </TouchableOpacity>
    );

    // Render LoadingIndicator.
    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Produkter'} />
    ) : (
        // Render Product FlatList.
        <FlatList
            style={Style.Container.flatList}
            data={appContext.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshing={appContext.isRefreshing} // Refreshing indicator
            onRefresh={loadInvoices} // Refreshing function
        />
    );
};
