import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



import meself from "./meself"
import lbsz from './lbsz'
import addtjzc from './addtjzc'
import addtjsr from './addtjsr'
import user from './user'

const Stack = createStackNavigator();



function newss(){
    return(
        
            <Stack.Navigator initialRouteName="meself">
                    <Stack.Screen name="meself" component={meself} options={{ headerShown:false }}  />
                    <Stack.Screen name="lbsz" component={lbsz} options={{ headerShown:false }} />
                    <Stack.Screen name="addtjzc" component={addtjzc} options={{ headerShown:false }} />
                    <Stack.Screen name="addtjsr" component={addtjsr} options={{ headerShown:false }} />
                    <Stack.Screen name="user" component={user} options={{ headerShown:false }} />
                </Stack.Navigator>
        
    )
}
export default newss