import React from 'react';
// eslint-disable-next-line import/namespace
import { ImageBackground, Text, View } from 'react-native';
import * as Style from '../../assets/styles';

type ArgumentTypes = {
    image: any | never;
    headerText: string;
};

/**
 * Screen cover image component.
 *
 * @param coverIMG
 * @param headerText
 * @constructor
 */
export function CoverImage({ image, headerText }: ArgumentTypes): JSX.Element {
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
