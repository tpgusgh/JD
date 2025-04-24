import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from "./src/Page/MainPage";
import Order from "./src/Page/Order";
import SugarScreen from "./src/Page/SugarScreen";
const Stack = createStackNavigator();


export function App(){
    return (
        <Stack.Navigator initialRouteName="MainPage" screenOptions={{headerShown: false}}   >
            <Stack.Screen name='MainPage' component={MainPage} options={{ headerShown: false}} />
            <Stack.Screen name='Order' component={Order} options={{ headerShown: false}} />
            <Stack.Screen name='SugarScreen' component={SugarScreen} options={{ headerShown: false}} />
            
        </Stack.Navigator>

      );
}