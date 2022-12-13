import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import * as Style from "../../assets/styles";

type ArgumentTypes = { loadingType: string | undefined };

/**
 * Activity indicator component.
 *
 * @param loadingType
 * @constructor
 */
export function LoadingIndicator({loadingType = undefined}: ArgumentTypes): JSX.Element {
    if (loadingType) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size='large' color={Style.Color.schemeOne.primary}/>

                <Text
                    style={{
                        paddingVertical: 25,
                        paddingHorizontal: Style.Typography.whiteSpace.X1
                    }}>
                    Loading {loadingType}...
                </Text>
            </View>
        );

    } else {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <ActivityIndicator size='large' color={Style.Color.schemeOne.primary}/>

                <Text
                    style={{
                        paddingVertical: 25,
                        paddingHorizontal: Style.Typography.whiteSpace.X1
                    }}>
                    Loading...
                </Text>
            </View>
        );
    }
}
