import React, {useState, useEffect} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        console.log('loginUser() -> Attempting to log in...');

        // Login user.
        try {
            await authContext.login(email, password);
        } catch (error) {
            console.error('loginUser() -> Error during login:', error);
        } finally {
            console.log('loginUser() -> Login function completed.');

            if (authContext.isLoggedIn) {
                console.log(
                    'loginUser() -> User is logged in, navigating to Faktura screen?',
                );

                navigation.navigate('Faktura');
            }
        }
    };

    useEffect((): void => {
        console.log(
            'LoginForm -> useEffect() -> isLoggedIn: ',
            authContext.isLoggedIn,
        );

        if (authContext.isLoggedIn) {
            navigation.navigate('Faktura');
        }
    }, [authContext.isLoggedIn, navigation]);


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

            <View style={[Style.Container.grid.rowNoPadding, {
                marginTop: Style.Typography.whiteSpace[100],
            }]}>
                <Pressable
                    style={({pressed}) => [
                        Style.Button.buttonContainer,
                        {opacity: pressed ? 0.5 : 1},
                    ]}
                    onPress={loginUser}>
                    <Text style={Style.Typography.buttonText}>Logga in</Text>
                </Pressable>

                <Text>
                    Om ni inte har en användare kan ni
                    <Pressable
                        onPress={(): void => {
                            navigation.navigate('Registrera användare');
                        }}
                        style={({pressed}) => [
                            {opacity: pressed ? 0.5 : 1},
                        ]}>
                        <Text style={{color: 'blue'}}>
                            registrera en ny användare här.
                        </Text>
                    </Pressable>
                </Text>
            </View>
        </View>
    );
};
