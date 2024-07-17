import React, {useCallback, useEffect, useMemo} from 'react';
import {
    Pressable,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native';
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {useAppContext} from '../../context/App.provider';
import {useAuthContext} from '../../context/Auth.provider';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import * as InvoiceModel from '../../models/Invoices';
import * as InvoiceInterfaces from '../../interfaces/Invoice';
import * as Style from '../../assets/styles';


/**
 * Invoice data table component.
 *
 * @constructor
 */
export const InvoiceDataTable: React.FC = (): React.ReactElement => {
    const authContext = useAuthContext();
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? false;


    const loadInvoices = async (): Promise<void> => {
        console.log('Loading invoices...');

        try {
            appContext.setIsRefreshing(true);
            let invoices = await InvoiceModel.getInvoices();
            appContext.setInvoices(invoices['data']);
        } catch (error) {
            console.error(error);
        } finally {
            reload = false;
            appContext.setIsRefreshing(false);
        }
    };


    useFocusEffect(
        useCallback((): void => {
            if (
                !Array.isArray(appContext.invoices) ||
                !appContext.invoices.length ||
                reload === true
            ) {
                console.log('Reloading invoices...');
                void loadInvoices();
                navigation.setParams({reload: false});
            }
        }, [reload, appContext.invoices, navigation.setParams]),
    );


    const dataTable: React.ReactElement = useMemo(() => {
        if (
            !Array.isArray(appContext.invoices) ||
            appContext.invoices.length === 0
        ) {
            // Return fallback component when there are no invoices
            return (
                <View style={Style.Container.content}>
                    <Text>
                        Det finns inga inleveranser... skapa några kanske?
                    </Text>
                </View>
            );
        }


        const dataTableRows: React.ReactElement[] = appContext.invoices.map(
            (invoice: InvoiceInterfaces.Invoice, index: number) => {
                return (
                    <Pressable
                        key={index}
                        onPress={async () => {
                            // Handle row press here
                            await navigation.navigate('Faktura', {invoice});
                        }}
                        style={({pressed}) => [
                            Style.Container.content,
                            {
                                backgroundColor: pressed
                                    ? Style.Color.schemeOne.primary[100]
                                    : Style.Color.background.light,
                            },
                        ]}>
                        <DataTable.Row style={Style.Container.grid.row}>
                            <DataTable.Cell style={Style.Container.grid.col[1]}>
                                {invoice.id.toString()}
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.grid.col[2]}>
                                <Text>
                                    {invoice.name.split(' ').join('\n')}
                                </Text>
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.grid.col[1]}>
                                {invoice.order_id.toString()}
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.grid.col[1]}>
                                {invoice.total_price.toString()} kr
                            </DataTable.Cell>

                            <DataTable.Cell style={Style.Container.grid.col[2]}>
                                {new Date(
                                    invoice.creation_date.toString(),
                                ).toLocaleString()}
                            </DataTable.Cell>

                            {/*<DataTable.Cell style={Style.Container.grid.col[2]}>*/}
                            {/*    {new Date(*/}
                            {/*        invoice.due_date.toString(),*/}
                            {/*    ).toLocaleString()}*/}
                            {/*</DataTable.Cell>*/}
                        </DataTable.Row>
                    </Pressable>
                );
            },
        );


        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={Style.Container.grid.col[1]}>
                        Faktura
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.grid.col[1]}>
                        Namn
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.grid.col[1]}>
                        Order
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.grid.col[1]}>
                        Belopp
                    </DataTable.Title>

                    <DataTable.Title style={Style.Container.grid.col[1]}>
                        Skapad
                    </DataTable.Title>
                    {/*<DataTable.Title>Förfallodatum</DataTable.Title>*/}
                </DataTable.Header>

                {dataTableRows}
            </DataTable>
        );
    }, [appContext.invoices]);

    // Data Table
    return appContext.isRefreshing ? (
        <View style={Style.Container.content}>
            <View style={Style.Container.grid}>
                <Pressable
                    style={({pressed}) => [
                        Style.Button.buttonContainer,
                        {
                            backgroundColor: pressed
                                ? Style.Color.schemeOne.primary[200]
                                : Style.Color.schemeOne.primary[300],
                        },
                    ]}
                    onPress={async () => {
                        // Logout user.
                        await authContext.logout();
                        await navigation.navigate('Logga in');
                    }}>
                    <Text style={Style.Typography.buttonText}>Logga ut</Text>
                </Pressable>
                <Pressable
                    style={({pressed}) => [
                        Style.Button.buttonContainer,
                        {
                            backgroundColor: pressed
                                ? Style.Color.schemeOne.primary[200]
                                : Style.Color.schemeOne.primary[300],
                        },
                    ]}
                    onPress={async () => {
                        await navigation.navigate('Skapa faktura');
                    }}>
                    <Text style={Style.Typography.buttonText}>
                        Skapa ny faktura
                    </Text>
                </Pressable>

                <View style={Style.Container.content}>
                    <LoadingIndicator loadingType={'Fakturor'}/>
                </View>
            </View>
        </View>
    ) : (
        <View style={Style.Container.content}>
            <View style={Style.Container.grid}>
                <Pressable
                    style={({pressed}) => [
                        Style.Button.buttonContainer,
                        {
                            backgroundColor: pressed
                                ? Style.Color.schemeOne.primary[200]
                                : Style.Color.schemeOne.primary[300],
                        },
                    ]}
                    onPress={async () => {
                        // Logout user.
                        await authContext.logout();
                        await navigation.navigate('Logga in');
                    }}>
                    <Text style={Style.Typography.buttonText}>Logga ut</Text>
                </Pressable>

                <Pressable
                    style={({pressed}) => [
                        Style.Button.buttonContainer,
                        {
                            backgroundColor: pressed
                                ? Style.Color.schemeOne.primary[200]
                                : Style.Color.schemeOne.primary[300],
                        },
                    ]}
                    onPress={async () => {
                        await navigation.navigate('Skapa faktura');
                    }}>
                    <Text style={Style.Typography.buttonText}>
                        Skapa ny faktura
                    </Text>
                </Pressable>
            </View>

            <ScrollView
                style={Style.Container.content}
                refreshControl={
                    <RefreshControl
                        refreshing={appContext.isRefreshing}
                        onRefresh={loadInvoices}
                    />
                }>
                {dataTable}
            </ScrollView>
        </View>
    );
};
