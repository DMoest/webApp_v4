/**
 * Module imports.
 */
import React from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { CoverImage } from '../components/Utils/CoverImage';
import coverIMG from '../assets/img/NutsAndBolts-4.jpg';
import * as Style from '../assets/styles';

/**
 * Home screen/view.
 *
 * @constructor
 */
export const Home: React.FC = () => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            <View style={Style.Image.imageContainer}>
                <ImageBackground
                    source={coverIMG}
                    style={Style.Image.image}>
                    <Text style={Style.Typography.header}>Infinity</Text>
                </ImageBackground>
            </View>

            <View
                style={[
                    Style.Container.containers,
                    { paddingHorizontal: Style.Typography.whiteSpace.X075 },
                ]}>
                <Text style={Style.Typography.paragraph}>
                    Välkommen till vår fiktiva mobila lagerapp. Idag lagrar vi
                    skruv och skrot, imorgon kanske något helt annat och den som
                    lever då får se. Hoppas ni trivs med att använda vår app och
                    hittar något riktigt rostigt.{' '}
                </Text>
                <Text
                    style={[
                        Style.Typography.paragraph,
                        Style.Typography.endMarginText,
                    ]}>
                    För tillfället finns endast begränsad funktionalitet men
                    inom kort tillkommer mer.{' '}
                </Text>
            </View>
        </SafeAreaView>
    );
};
