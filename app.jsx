import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from "./src/Page/MainPage.jsx";
import Order from "./src/Page/Order";
import SugarScreen from "./src/Page/SugarScreen";
import List from "./src/Page/List";
import DeliveryTracking from "./src/Page/DeliveryTracking";
const Stack = createStackNavigator();



export function App(){
    return (
        <Stack.Navigator initialRouteName="MainPage" screenOptions={{headerShown: false}}   >
            <Stack.Screen name='MainPage' component={MainPage} options={{ headerShown: false}} />
            <Stack.Screen name='Order' component={Order} options={{ headerShown: false}} />
            <Stack.Screen name='SugarScreen' component={SugarScreen} options={{ headerShown: false}} />
            <Stack.Screen name='List' component={List} options={{ headerShown: false}} />
            <Stack.Screen name='DeliveryTracking' component={DeliveryTracking} options={{ headerShown: false}} />
        </Stack.Navigator>

      );
}