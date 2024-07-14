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
 * DeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const DeliveryList: React.FC = (): React.ReactElement => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? true;


    /**
     * Asynchronously loads deliveries from the DeliveryModel and updates the app context with the fetched
     * deliveries. It sets the app context's `isRefreshing` state to true at the beginning of the operation and to
     * false upon completion or failure. If the operation is successful, the fetched deliveries are stored in the app
     * context's `deliveries` state. In case of an error, the error is logged to the console. Regardless of the
     * outcome, the `reload` flag is set to false at the end of the operation to indicate that a reload is no
     * longer necessary.
     *
     * @returns {Promise<DeliveriesInterfaces.Deliveries[] | undefined>} A promise that resolves to the list of
     * fetched deliveries or undefined if an error occurs.
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
     * there are no deliveries or a FlatList of delivery items based on the current state of deliveries in the app
     * context.
     *
     * If there are no deliveries (`appContext.deliveries.length === 0`), it renders a view with a warning message.
     * Otherwise, it renders a FlatList component populated with delivery items. The FlatList is configured to
     * refresh on pull-down, invoking the `loadDeliveries` function to fetch and display the latest deliveries.
     *
     * The memoization is dependent on `appContext.deliveries` and `appContext.isRefreshing`, ensuring that the
     * component only re-renders when these values change, for performance optimization.
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
