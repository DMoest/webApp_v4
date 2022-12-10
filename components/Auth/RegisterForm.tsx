/**
 * Module imports.
 */
import React from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    // eslint-disable-next-line import/namespace
} from 'react-native';
// import { useAppContext } from '../../context/App.provider';
import { useAuthContext } from '../../context/Auth.provider';
import * as Style from '../../assets/styles/index';
import {useNavigation} from "@react-navigation/native";

/**
 * Create new Login form component.
 *
 * @constructor
 */
export const RegisterForm: React.FC = () => {
    const navigation = useNavigation();
    // const authContext = useAuthContext();

    let email: string;
    let password: string;
    let passwordConfirm: string;

    return (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.subHeader}>
                Registrera en ny användare här...
            </Text>

            <Text>Email / Username: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={email}
                onChangeText={() => {
                    email;
                }}
            />

            <Text>Password: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={password}
                onChangeText={() => {
                    password;
                }}
            />

            <Text>Confirm password: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={passwordConfirm}
                onChangeText={() => {
                    passwordConfirm;
                }}
            />

            <TouchableOpacity
                style={Style.Button.button}
                onPress={() => {
                    console.log('Click! -> Registrera ny användare...');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Registrera ny användare
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={Style.Button.button}
                onPress={() => {
                    console.log('Click! -> Gå till logga in...');
                    navigation.navigate('Logga in formulär');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Gå till Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};
