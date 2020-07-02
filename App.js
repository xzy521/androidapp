/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements'

import newss from './src/views/pages/myself/new'
import Find from './src/views/find/find'
import Picture from './src/views/picture/picture'
import Tilly from './src/views/tilly/tilly'
import Mx from './src/views/mx/mx'
import newfind from './src/views/find/newfind'

import lbsz from './src/views/pages/myself/lbsz'

const Stack = createStackNavigator();

const Bootm= createBottomTabNavigator()

function App (){
  return(<NavigationContainer>
    <Bootm.Navigator initialRouteName="newss" tabBarOptions={{activeTintColor: '#FFDA44', inactiveTintColor: '#555'}}>
     
      <Bootm.Screen name="Mx" component={Mx} 
        options={{
          tabBarIcon: ({color}) => <Icon color={color} name="redenvelopes" type="antdesign" />,
          tabBarLabel: '明细'
        }}
      />
      <Bootm.Screen name="Picture" component={Picture} 
        options={{
          tabBarIcon: ({color}) => <Icon color={color} name="linechart" type="antdesign" />,
          tabBarLabel: '图表'
        }}
      />
      <Bootm.Screen name="Tilly" component={Tilly} 
        options={{
          tabBarIcon: ({color}) => <Icon color={color} name="pluscircle" type="antdesign" />,
          tabBarLabel: '记账'
        }}
      />
      <Bootm.Screen name="newfind" component={newfind} 
        options={{
          tabBarIcon: ({color}) => <Icon color={color} name="find" type="antdesign" />,
          tabBarLabel: '发现'
        }}
      />
       <Bootm.Screen name="newss" component={newss} 
        options={{
          tabBarIcon: ({color}) => <Icon color={color} name="user-circle-o" type="font-awesome" />,
          tabBarLabel: '我的'
        }}
      />


    </Bootm.Navigator>
    
      </NavigationContainer>
  )
}

export default App;
