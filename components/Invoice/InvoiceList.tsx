/**
 * Module imports.
 */
import React, {useCallback} from 'react';
import {FlatList, Pressable, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {useAppContext} from '../../context/App.provider';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import {InvoiceListItem} from './InvoiceListItem';
import * as InvoiceInterfaces from '../../interfaces/Invoice';
import * as InvoiceModel from '../../models/Invoices';
import * as Style from '../../assets/styles';


/**
 * A functional component that renders a list of invoices.
 *
 * This component utilizes the application context to manage and display invoices. It listens for focus
 * events to determine when to reload invoices, either based on a specific request or the absence of
 * invoices in the context. The component provides functionality to refresh the invoice list manually.
 * Each invoice item is rendered as a pressable component, allowing users to navigate to a detailed view
 * upon interaction.
 *
 * The component's rendering behavior is conditional: it displays a loading indicator while invoices are
 * being fetched or refreshed; otherwise, it displays a list of invoices. The list is interactive, with
 * each item leading to a detailed invoice specification screen upon press.
 *
 * Key Functions:
 * - `loadInvoices`: Asynchronously fetches invoices from the server and updates the application context.
 * - `useFocusEffect`: React hook that triggers `loadInvoices` based on component focus and specific
 * conditions.
 * - `renderItem`: Renders individual invoice items as pressable components for interaction.
 *
 * Usage:
 * This component should be used within a navigation context where the invoice list needs to be displayed and
 * interacted with. It requires the application context to be properly initialized and available.
 *
 * @returns {React.ReactElement} A component that displays a list of invoices or a loading indicator
 * based on the application state.
 */
export const InvoiceList: React.FC = (): React.ReactElement => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? false;


    /**
     * Asynchronously loads invoices from the server and updates the application context.
     *
     * This function attempts to fetch invoices using the InvoiceModel's getInvoices method. Upon calling,
     * it first sets the application context's isRefreshing state to true, indicating that an invoice loading
     * process is underway. If the invoices are successfully fetched, they are set in the application context
     * to be accessed by other components. If an error occurs during the fetch process, the error is logged
     * to the console. Finally, regardless of the outcome, the isRefreshing state is set to false, indicating
     * that the loading process has completed.
     */
    async function loadInvoices(): Promise<void> {
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
     * Hook to manage the loading of invoices when the component is focused.
     *
     * This hook is triggered every time the component comes into focus. It checks if a reload is requested
     * or if there are no invoices currently loaded. If either condition is true, it attempts to load
     * invoices from the server. Upon successful loading, it resets the reload parameter to false to
     * prevent unnecessary reloads on subsequent focuses. If invoices are already loaded and no reload is
     * requested, it simply sets the loading state to false.
     *
     * Dependencies:
     * - reload: A boolean indicating whether a reload of invoices is requested.
     * - appContext.invoices.length: The current number of invoices loaded, used to determine if loading
     * is necessary.
     * - navigation.setParams: Function from navigation to reset the reload parameter.
     */
    useFocusEffect(
        useCallback((): void => {
            console.info('useFocusEffect called...');

            if (reload === true || !appContext.invoices.length) {
                void loadInvoices().then((): void => {
                    // Reset the reload parameter to false after loading deliveries
                    navigation.setParams({reload: false});
                });
            } else {
                console.info('Invoices already loaded and no reload...');
                appContext.setIsLoading(false);
            }
        }, [reload, appContext.invoices.length, navigation.setParams])
    );


    /**
     * Renders an individual invoice item as a pressable component.
     *
     * This function takes an invoice item and wraps it in a `Pressable` component to make it interactive.
     * When pressed, it navigates to the 'Fakturaspecifikation' screen  with the selected invoice item as
     * a parameter. The style of the pressable component changes dynamically based on its pressed state to
     * provide visual feedback.
     *
     * @param {InvoiceInterfaces.Invoice} {item} - The invoice item to be rendered. It must be an object
     * conforming to the Invoice interface.
     * @returns {React.ReactElement} A pressable component representing the invoice item.
     */
    const renderItem = ({item}: InvoiceInterfaces.Invoice): React.ReactElement => (
        <Pressable
            key={item.id}
            style={({pressed}) => [
                Style.Button.buttonContainer,
                pressed ? Style.Button.pressed : {},
            ]}
            onPress={() => navigation.navigate('Fakturaspecifikation', {item})}
        >
            <InvoiceListItem item={item}/>
        </Pressable>
    );


    // Render LoadingIndicator.
    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Produkter'}/>
    ) : (
        // Render Product FlatList.
        <FlatList
            style={Style.Container.flatList}
            data={appContext.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshing={appContext.isRefreshing}
            onRefresh={loadInvoices}
        />
    );
};
