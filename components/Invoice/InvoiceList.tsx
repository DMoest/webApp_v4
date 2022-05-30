/**
 * Module imports.
 */
import React from 'react';
// eslint-disable-next-line import/namespace
import { View, Text } from 'react-native';
import { useAppContext } from '../../context/App.provider';
import { useAuthContext } from '../../context/Auth.provider';

/**
 * Invoice list component.
 * @constructor
 */
export const InvoiceList: React.FC = () => {
    const appContext = useAppContext();
    const authContext = useAuthContext();

    return (
        <View>
            <Text>Invoice List</Text>

            <Text>Här ska det finnas en lista av fakturor. </Text>
        </View>
    );
};
