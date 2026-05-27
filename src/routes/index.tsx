import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AutentRoutes from "./autent";

export default function Routes(){
    return (
        <NavigationContainer>
          <AutentRoutes/>  
        </NavigationContainer>
    )
}