/**
 * Module imports.
 */
import React from 'react';
import {
    Text,
    TextInput,
    View,
    // eslint-disable-next-line import/namespace
} from 'react-native';
// import { useAppContext } from '../../context/App.provider';
import { useAuthContext } from '../../context/Auth.provider';
import * as Style from '../../assets/styles/index';

/**
 * Create new Login form component.
 *
 * @constructor
 */
export const Login: React.FC = () => {
    const authContext = useAuthContext();

    return (
        <View style={Style.Container.content}>
            <Text>Login Form here</Text>

            <Text>Email / Username: </Text>
            <TextInput
                style={Style.Form.textInputField}
                value={authContext.isLoggedIn}
                onChangeText={() => {
                    authContext.setIsLoggedIn(authContext.isLoggedIn);
                }}
            />

            {/*<Text>Password: </Text>*/}
            {/*<TextInput*/}
            {/*    key={authContext.isLoggedIn.password}*/}
            {/*    onChangeText={() => {*/}
            {/*        authContext.setIsLoggedIn({*/}
            {/*            ...authContext.isLoggedIn,*/}
            {/*            password,*/}
            {/*        });*/}
            {/*    }}*/}
            {/*/>*/}
        </View>
    );
};
