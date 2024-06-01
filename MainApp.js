import { useDispatch, useSelector } from "react-redux"
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as actions from './src/Redux/actions'
import { useEffect } from "react";
import store from "./src/Redux/store";
import { NavigationContainer } from "@react-navigation/native";
import PrayerTimes from "./src/Screens/PrayerTimes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/Screens/SplashScreen";
import Tab from './src/Screens/Tab'
import ReloadScreen from "./src/Screens/ReloadScreen";
function MainApp() {
    const stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}></stack.Screen>
                <stack.Screen name="ReloadScreen" component={ReloadScreen} options={{ headerShown: false }}></stack.Screen>
                <stack.Screen name="Tab" component={Tab} options={{ headerShown: false }}></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default MainApp