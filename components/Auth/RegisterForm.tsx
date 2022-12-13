/**
 * Module imports.
 */
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View,} from 'react-native';
// import { useAppContext } from '../../context/App.provider';
import * as Style from '../../assets/styles/index';
import {useNavigation} from "@react-navigation/native";
import {useAuthContext} from "../../context/Auth.provider";

/**
 * Create new Login form component.
 *
 * @constructor
 */
export const RegisterForm: React.FC = () => {
    const navigation = useNavigation();
    const authContext = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.subHeader}>
                Registrera en ny användare här...
            </Text>

            <Text>Email: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />

            <Text>Lösenord: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <Text>Bekräfta Lösenordet: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={Style.Button.button}
                onPress={async () => {
                    console.log('Click! -> Registrera ny användare med...');
                    console.log('Input Email -> ', email);
                    console.log('Input Password -> ', password);
                    console.log('Input ConfirmedPassword -> ', passwordConfirm);

                    // Register user.
                    if (password === passwordConfirm) {
                        // Register user in API.
                        await authContext.register(email, password);
                        console.log('User registered!');

                        // Login user in API.
                        await authContext.login(email, password);
                        console.log('User logged in!');

                        // Navigate to Invoice screen.
                        await navigation.navigate('Faktura');
                    } else {
                        console.log('Passwords do not match!');
                    }
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
