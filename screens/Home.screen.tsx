/**
 * Module imports.
 */
import React from 'react';
// eslint-disable-next-line import/namespace
import {SafeAreaView, Text, View} from 'react-native';
import {CoverImage} from '../components/Utils/CoverImage';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from '../assets/img/NutsAndBolts-4.jpg';
import * as Style from '../assets/styles';
import {useAppContext} from "../context/App.provider";

/**
 * Home screen/view.
 *
 * @constructor
 */
export const Home: React.FC = () => {
    const appContext = useAppContext();

    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({headerText: 'Infinity', image: coverIMG})}

            <View
                style={[
                    Style.Container.containers,
                    {paddingHorizontal: Style.Typography.whiteSpace.X075},
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
                    inom kort tillkommer mer. Ni kan se vårat produktlager,
                    titta på ordrar av produkter och hantera inleveranser av
                    produkter.
                </Text>
            </View>
        </SafeAreaView>
    );
};
