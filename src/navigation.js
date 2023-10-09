// @ts-nocheck
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../src/screens/HomeScreen';
import LoginScreen from '../src/screens/Login'; // Import your LoginScreen component
import RegisterScreen from '../src/screens/Register'; // Import your RegisterScreen component
import ShoeUploadScreen from '../src/screens/FormScreen'; // Import your ShoeUploadScreen component
import CartScreen from './screens/CartScreen';
import { Pressable, Text } from 'react-native';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector((state) => state?.cart?.cartItems?.length);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={{ flexDirection: 'row' }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                name="truck-delivery"
                size={22}
                color="gray"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="ShoeUpload"
          component={ShoeUploadScreen}
          options={{ title: 'Upload Shoe' }}
        />
          <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Your Cart' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
