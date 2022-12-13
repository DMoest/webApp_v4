import React, {useEffect} from 'react';
// eslint-disable-next-line import/namespace
import {LogBox} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';
import * as Style from './assets/styles/index';
import {
    OleoScriptSwashCaps_400Regular,
    OleoScriptSwashCaps_700Bold,
    useFonts,
} from '@expo-google-fonts/oleo-script-swash-caps';
import {JosefinSans_400Regular, JosefinSans_500Medium, JosefinSans_600SemiBold,} from '@expo-google-fonts/josefin-sans';
import {
    Merriweather_300Light,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
    Merriweather_700Bold_Italic,
} from '@expo-google-fonts/merriweather';
import {useAuthContext} from "./context/Auth.provider";
import {useAppContext} from "./context/App.provider";
import * as AuthModel from "./models/Auth";
import {LoadingIndicator} from "./components/Utils/LoadingIndicator";

/**
 * LogBox ignore logs.
 * Ignore remote debugger & non-serializable objects.
 */
LogBox.ignoreLogs([
    'Remote debugger',
    'Non-serializable values were found in the navigation state',
]);


/**
 * Main App module.
 *
 * Build states for app.
 * Font loader to with the package expo-google-fonts.
 * SafeAreaView with navigation containers.
 * Navigation with React-Navigation package, stack navigation type to navigate between app screens.
 *
 * @constructor
 */
export const App: React.FC = () => {
    const authContext = useAuthContext();
    const appContext = useAppContext();
    const [fontsLoaded] = useFonts({
        OleoScriptSwashCaps_400Regular,
        OleoScriptSwashCaps_700Bold,
        JosefinSans_400Regular,
        JosefinSans_500Medium,
        JosefinSans_600SemiBold,
        Merriweather_300Light,
        Merriweather_300Light_Italic,
        Merriweather_400Regular,
        Merriweather_400Regular_Italic,
        Merriweather_700Bold,
        Merriweather_700Bold_Italic,
    });

    useEffect(() => {
        console.log("User: ", authContext.user);

        // Async function to prepare app.
        async function prepare() {
            try {
                appContext.setIsLoading(true);

                // Pre-load fonts, make any API calls you need to do here...
                authContext.setIsLoggedIn(await AuthModel.loggedIn());

                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                // await new Promise(resolve => setTimeout(resolve, 2000));
                appContext.setIsLoading(false);
            } catch (error) {
                console.warn(error);
            } finally {
                // Tell the application to render
                appContext.setIsLoading(false);
            }
        }

        // Call the function
        prepare();
    }, []);

    if (appContext.isLoading || !fontsLoaded) {
        return (
            <LoadingIndicator loadingType={undefined}/>
        );
    }

    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            <NavigationContainer>
                <BottomTabsNavigator/>
            </NavigationContainer>
        </SafeAreaView>
    );
};

/**
 * Module exports.
 */
export default App;
