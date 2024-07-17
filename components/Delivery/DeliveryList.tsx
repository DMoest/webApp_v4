import React, {useCallback, useMemo} from 'react';
import {useAppContext} from '../../context/App.provider';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, Pressable, Text, View} from 'react-native';
import {DeliveryListItem} from './DeliveryListItem';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as DeliveryModel from '../../models/Deliveries';
import * as Style from '../../assets/styles';


/**
 * `DeliveryList` is a functional component that manages the display of a list of deliveries. It
 * integrates with the application's context to fetch and display delivery data, leveraging the React
 * Navigation library for navigation and the use of focus effects to reload data as needed. This component
 * is responsible for fetching delivery and product data asynchronously, handling user interactions to
 * navigate to detailed views, and providing visual feedback during data loading states.
 *
 * The component performs the following key functions:
 * - Fetches delivery and product data asynchronously from a model and updates the application context
 *   with this data.
 * - Utilizes the `useFocusEffect` hook to reload data when the component gains focus, based on specific
 *   conditions
 *   such as the `reload` flag being true or the deliveries list being empty.
 * - Renders a list of deliveries using the `FlatList` component from React Native, with each item in the
 *   list being
 *   pressable to navigate to a detailed view of the delivery.
 * - Provides a visual indication of loading state and the ability to refresh the deliveries list via a
 *   pull-down gesture.
 * - Offers a button to navigate to a form for creating a new delivery.
 *
 * Props: None
 *
 * State:
 * - Uses context state for managing deliveries, products, and the refreshing state.
 * - Local state `reload` is derived from navigation parameters to determine if data should be reloaded.
 *
 * Returns:
 * - A React element that conditionally renders either a loading indicator or the list of deliveries,
 *   along with a button for creating new deliveries.
 */
export const DeliveryList: React.FC = (): React.ReactElement => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? true;


    /**
     * Asynchronously loads deliveries from the DeliveryModel and updates the app context with the fetched
     * deliveries. It sets the app context's `isRefreshing` state to true at the beginning of the
     * operation and to false upon completion or failure. If the operation is successful, the fetched
     * deliveries are stored in the app context's `deliveries` state. In case of an error, the error is
     * logged to the console. Regardless of the outcome, the `reload` flag is set to false at the end of
     * the operation to indicate that a reload is no longer necessary.
     *
     * @returns {Promise<DeliveriesInterfaces.Deliveries[] | undefined>} A promise that resolves to the
     * list of fetched deliveries or undefined if an error occurs.
     */
    async function loadDeliveries() {
        appContext.setIsRefreshing(true);

        try {
            appContext.setDeliveries(await DeliveryModel.getDeliveries());

            return appContext.deliveries;
        } catch (error) {
            console.warn(error);
        } finally {
            reload = false;
            appContext.setIsRefreshing(false);
        }
    }


    /**
     * Triggers the `loadDeliveries` function when the component gains focus and either the `reload` flag
     * is set to true or there are no orders in the app context. This effect is designed to ensure that
     * the deliveries list is up-to-date whenever the user navigates to the component. After successfully
     * loading the deliveries, it resets the `reload` parameter to false to prevent unnecessary reloads on
     * subsequent focus events.
     *
     * The effect is dependent on the `reload` flag, the length of the deliveries array in the app
     * context, and the `setParams` method from the navigation object, meaning it will re-run only when
     * any of these dependencies change.
     */
    useFocusEffect(
        useCallback((): void => {
            if (reload === true || appContext.deliveries.length === 0) {
                void loadDeliveries().then((): void => {
                    // Reset the reload parameter to false after loading deliveries
                    navigation.setParams({reload: false});
                });
            }
        }, [reload, appContext.deliveries.length, navigation.setParams])
    );


    /**
     * Renders a single delivery item as a pressable component within a list.
     *
     * This component changes its background color when pressed, providing visual feedback to the user.
     * Upon pressing, it navigates to the 'Inleveransspecifikation' screen with the item's details.
     *
     * @param {Object} props - The properties passed to the renderItem function.
     * @param {Object} props.item - The delivery item data to be rendered.
     * @returns {React.ReactElement} A pressable component representing a single delivery item.
     */
    const renderItem = ({item}: { item: object; }): React.ReactElement => (
        <Pressable
            key={item.id}
            onPress={(): void => {
                navigation.navigate('Inleveransspecifikation', {item});
            }}
            style={({pressed}) => [
                Style.Button.listButton,
                {
                    backgroundColor: pressed
                        ? Style.Color.schemeOne.primary[200]
                        : Style.Button.listButton.backgroundColor,
                },
            ]}>
            <DeliveryListItem item={item}/>
        </Pressable>
    );


    /**
     * Memorizes and returns a React JSX element that conditionally renders either a message indicating
     * there are no deliveries or a FlatList of delivery items based on the current state of deliveries
     * in the app context.
     *
     * If there are no deliveries (`appContext.deliveries.length === 0`), it renders a view with a
     * warning message. Otherwise, it renders a FlatList component populated with delivery items. The
     * FlatList is configured to refresh on pull-down, invoking the `loadDeliveries` function to fetch and
     * display the latest deliveries.
     *
     * The memoization is dependent on `appContext.deliveries` and `appContext.isRefreshing`, ensuring
     * that the component only re-renders when these values change, for performance optimization.
     *
     * @returns {React.JSX.Element} A React JSX element that is either a message indicating no deliveries or
     * a FlatList of delivery items.
     */
    const renderDeliveriesList: React.JSX.Element = useMemo(() => {
        if (appContext.deliveries.length === 0) {
            return (
                <View style={Style.Container.warningMsgContainer}>
                    <Text style={Style.Typography.warningFlashMsg}>
                        Det finns inte några inleveranser...
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={appContext.deliveries}
                    keyExtractor={(item: DeliveriesInterfaces.Deliveries) =>
                        item.id.toString()
                    }
                    renderItem={renderItem}
                    refreshing={appContext.isRefreshing}
                    onRefresh={loadDeliveries}
                />
            );
        }
    }, [appContext.deliveries, appContext.isRefreshing]);


    return appContext.isRefreshing ? (
        <View style={Style.Container.content}>
            <Pressable
                key={'newDeliveryBTN'}
                style={Style.Button.buttonContainer}
                onPress={(): void => {
                    navigation.navigate('Inleverasformulär');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Inleverans
                </Text>
            </Pressable>

            <LoadingIndicator loadingType={'Leveranser'}/>
        </View>
    ) : (
        <View style={Style.Container.content}>
            <Pressable
                key={'newDeliveryBTN'}
                style={Style.Button.buttonContainer}
                onPress={(): void => {
                    navigation.navigate('Inleverasformulär');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Inleverans
                </Text>
            </Pressable>

            {renderDeliveriesList}
        </View>
    );
};
