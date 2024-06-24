import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as Style from '../../assets/styles';

type ArgumentTypes = { loadingType: string | undefined };

/**
 * Activity indicator component.
 *
 * @param loadingType
 * @constructor
 */
export function LoadingIndicator({
    loadingType = undefined,
}: ArgumentTypes): React.JSX.Element {
    if (loadingType !== undefined) {
        return (
            <View style={Style.Utils.loadingIndicatorContainer}>
                <ActivityIndicator
                    size='large'
                    color={Style.Color.schemeOne.primary[300]}
                    style={Style.Utils.loadingIndicator}
                />

                <Text style={Style.Utils.loadingIndicatorText}>
                    Laddar {loadingType}...
                </Text>
            </View>
        );
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <ActivityIndicator
                    size='large'
                    color={Style.Color.schemeOne.primary[300]}
                />

                <Text
                    style={{
                        paddingVertical: 25,
                        paddingHorizontal: Style.Typography.whiteSpace[100],
                    }}>
                    Laddar...
                </Text>
            </View>
        );
    }
}
