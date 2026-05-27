import React from "react";
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from "../screens/CadastroScreen";
import PerfilScreen from "../screens/PerfilScreen";
import RecuperacaoSenhaScreen from "../screens/RecuperacaoSenhaScreen";
import ResetarSenhaScreen from "../screens/ResetarSenhaScreen";
import AppTabRoutes from "./AppTabRoutes";


const Stack = createNativeStackNavigator()

export default function AutentRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Welcome" component= {WelcomeScreen}/>
            <Stack.Screen name= "Login" component={LoginScreen}/>
            <Stack.Screen name= "Cadastro" component={CadastroScreen}/>
            <Stack.Screen name= "Perfil" component={PerfilScreen}/>
            <Stack.Screen name="RecuperacaoSenha" component={RecuperacaoSenhaScreen}/>
            <Stack.Screen name="RedefinirSenha" component={ResetarSenhaScreen}/>
            <Stack.Screen name= "AreaLogada" component={AppTabRoutes}/>
        </Stack.Navigator>
    )
}