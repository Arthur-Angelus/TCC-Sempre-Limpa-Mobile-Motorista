import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors'
import { HomeScreen } from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

// Um componente vazio só para não dar erro enquanto você não cria as outras telas
const Placeholder = () => null; 

export default function AppTabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: '#A0A0A0',
            }}
        >
            {/* O nome que você coloca no 'name' é o que aparece escrito embaixo do ícone */}
            <Tab.Screen 
                name="Início" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-outline" color={color} size={size} />
                    )
                }}
            />

            <Tab.Screen 
                name="Lavanderias" 
                component={Placeholder} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="washing-machine" color={color} size={size} />
                    )
                }}
            />

            <Tab.Screen 
                name="Pedidos" 
                component={Placeholder} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="receipt" color={color} size={size} />
                    )
                }}
            />

            <Tab.Screen 
                name="Perfil" 
                component={PerfilScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-outline" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}