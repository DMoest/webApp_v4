/**
 * Module imports.
 */
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { useAppContext } from '../../context/App.provider';
import {useAuthContext} from '../../context/Auth.provider';
import * as Style from '../../assets/styles/index';

/**
 * Create new Login form component.
 *
 * @constructor
 */
export const LoginForm: React.FC = () => {
    const authContext = useAuthContext();
    const navigation = useNavigation();

    // const [auth, setAuth] = useState<Partian<Auth>>({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={Style.Container.content}>
            <Text>Email: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={email}
                onChangeText={setEmail}
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <Text>Password: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={Style.Button.button}
                onPress={async () => {
                    // Login user.
                    await authContext.login(email, password);

                    // @ts-ignore
                    await navigation.navigate('Faktura');
                }}>

                <View>
                    <Text style={Style.Typography.buttonText}>Logga in</Text>
                </View>
            </TouchableOpacity>

            <Text>Om ni inte har en användare kan ni
                <TouchableOpacity
                    onPress={() => {
                        // @ts-ignore
                        navigation.navigate('Registrera användare');
                    }}>
                    <Text style={{color: 'blue'}}>
                        registrera en ny användare här.
                    </Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};
