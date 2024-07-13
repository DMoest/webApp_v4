import React, {useEffect, useMemo} from 'react'; // eslint-disable-next-line import/namespace
import {useAppContext} from '../../context/App.provider';
import {useNavigation} from '@react-navigation/native';
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
export const DeliveryList: React.FC = ({route}): React.JSX.Element => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    let reload = route.params?.reload ?? true;

    /**
     * React Hook to load deliveries and products.
     */
    useEffect(() => {
        appContext.setIsRefreshing(true);

        void loadDeliveries().then((): void => {
            // Set RELOAD to false.
            reload = false;

            // Set isRefreshing to false.
            appContext.setIsRefreshing(false);
        });
    }, [reload]);

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
     * Renders Delivery item in a FlatList.
     *
     * @param item
     */
    const renderItem = ({item}) => (
        <Pressable
            key={item.id}
            onPress={() => {
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
        <View>
            <TouchableOpacity
                key={'newdeliverybtn'}
                style={Style.Button.buttonSTD}
                onPress={() => {
                    navigation.navigate('Inleverasformulär');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </TouchableOpacity>

            <LoadingIndicator loadingType={'Leveranser'} />
        </View>
    ) : appContext.deliveries.length > 0 ? (
        <View>
            <TouchableOpacity
                key={'newdeliverybtn'}
                style={Style.Button.buttonSTD}
                onPress={() => {
                    navigation.navigate('Inleverasformulär');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </TouchableOpacity>
            <FlatList
                style={Style.Container.flatList}
                data={appContext.deliveries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshing={appContext.isRefreshing}
                onRefresh={loadDeliveries}
            />
        </View>
    ) : (
        <>
            <TouchableOpacity
                key={'newdeliverybtn'}
                style={Style.Button.buttonSTD}
                onPress={() => {
                    navigation.navigate('Inleverasformulär');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </TouchableOpacity>
            <View style={Style.Container.warningFlashMessageContainer}>
                <Text style={Style.Typography.warningFlashMessageText}>
                    Det finns inte några inleveranser...
                </Text>
            </View>
        </>
    );
};
