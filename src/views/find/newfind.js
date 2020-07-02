import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



import find from "./find"
import zd from './zd'

const Stack = createStackNavigator();



function newfind(){
    return(
        
            <Stack.Navigator initialRouteName="find">
                    <Stack.Screen name="find" component={find} options={{ headerShown:false }}  />
                    <Stack.Screen name="zd" component={zd} options={{ headerShown:false }} />
                </Stack.Navigator>
        
    )
}
export default newfind