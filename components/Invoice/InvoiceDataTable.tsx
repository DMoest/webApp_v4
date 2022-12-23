import React, {useEffect} from 'react';
import {useAppContext} from '../../context/App.provider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import {DataTable} from 'react-native-paper';
import * as InvoiceModel from '../../models/Invoices';
import {Text, TouchableOpacity, View} from 'react-native';
import * as Style from '../../assets/styles';

/**
 * Invoice data table component.
 *
 * @constructor
 */
export const InvoiceDataTable: React.FC = () => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? false;

    /**
     * Hook to fetch invoices
     */
    useEffect(() => {
        if (reload === true) {
            console.log(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
            // Set isRefreshing to false to remove Loading View.
            appContext.setIsRefreshing(false);
        }

        void loadInvoices();
    }, [reload]);

    async function loadInvoices() {
        console.log(`Route: ${route.name} ~> loadInvoices()`);
        appContext.setIsRefreshing(true);

        try {
            appContext.setInvoices(await InvoiceModel.getInvoices());
        } catch (error) {
            console.warn(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    }

    // Rows of Invoices for Data Table
    const dataTable = appContext.invoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.id.toString()}</DataTable.Cell>
                <DataTable.Cell>{invoice.name.toString()}</DataTable.Cell>
                <DataTable.Cell>{invoice.order_id.toString()}</DataTable.Cell>
                <DataTable.Cell>
                    {invoice.total_price.toString()} kr
                </DataTable.Cell>
                <DataTable.Cell>{invoice.creation_date}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    // Data Table
    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Fakturor'} />
    ) : (
        <View style={Style.Base.content}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Faktura</DataTable.Title>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Order</DataTable.Title>
                    <DataTable.Title>Belopp</DataTable.Title>
                    <DataTable.Title>Skapad</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {dataTable}
            </DataTable>
            <TouchableOpacity
                style={Style.Button.button}
                onPress={async () => {
                    await navigation.navigate('Skapa faktura');
                }}>
                <View>
                    <Text style={Style.Typography.buttonText}>
                        Skapa ny faktura
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
