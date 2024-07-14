/**
 * Module imports.
 */
import React, {useState} from 'react';
import {Pressable, Text, TextInput, View,} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useAuthContext} from "../../context/Auth.provider";
import * as Style from '../../assets/styles/index';


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


    function registerUser() {
        console.log('Click! -> Registrera ny användare med...');
        console.log('Input Email -> ', email);
        console.log('Input Password -> ', password);
        console.log('Input ConfirmedPassword -> ', passwordConfirm);

        // Register user.
        if (password === passwordConfirm) {
            // Register user in API.
            authContext.register(email, password);
            console.log('User registered!');

            // Login user in API.
            authContext.login(email, password);
            console.log('User logged in!');

            // Navigate to Invoice screen.
            navigation.navigate('Faktura');
        } else {
            console.log('Passwords do not match!');
        }
    }


    return (
        <View style={Style.Container.content}>
            <Text style={Style.Typography.subHeader}>
                Användarregistrering
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

            <View style={[Style.Container.grid.rowNoPadding, {
                marginTop: Style.Typography.whiteSpace[100],
            }]}>
                <Pressable
                    style={({pressed}) => [
                        Style.Button.buttonContainer,
                        {opacity: pressed ? 0.5 : 1},
                    ]}
                    onPress={registerUser}>
                    <Text style={Style.Typography.buttonText}>
                        Registrera ny användare
                    </Text>
                </Pressable>

                <Pressable
                    style={({pressed}) => [
                        Style.Button.buttonContainer,
                        {opacity: pressed ? 0.5 : 1},
                    ]}
                    onPress={() => {
                        console.log('Click! -> Gå till logga in...');
                        navigation.navigate('Logga in formulär');
                    }}>
                    <Text style={Style.Typography.buttonText}>
                        Gå till Login
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};
