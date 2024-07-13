import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { ScreenCoverArguments } from '../../interfaces/Utils';
import * as Style from '../../assets/styles';

/**
 * Screen cover image component.
 *
 * @param coverIMG
 * @param headerText
 * @constructor
 */
export function CoverImage({
    image,
    headerText,
}: ScreenCoverArguments): React.JSX.Element {
    return (
        <View style={Style.Image.imageContainer}>
            <ImageBackground
                source={image}
                style={Style.Image.image}>
                <Text style={Style.Typography.header}>{headerText}</Text>
            </ImageBackground>
        </View>
    );
}
