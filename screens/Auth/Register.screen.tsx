import React from 'react';
// eslint-disable-next-line import/namespace
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { useAuthContext } from '../../context/Auth.provider';
import { RegisterForm } from '../../components/Auth/RegisterForm';
import { CoverImage } from '../../components/Utils/CoverImage';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from '../../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../../assets/styles';

export const Register: React.FC = () => {
    // const authContext = useAuthContext();

    return (
        <View style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Registrera', image: coverIMG })}

            <RegisterForm />
        </View>
    );
};
