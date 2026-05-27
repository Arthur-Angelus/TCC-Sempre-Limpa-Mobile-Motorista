import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BackgroundPropriedades{
    children: React.ReactNode //O que essa linha faz: O componente ao ser criado tem que ser passado um "filho"
    //O que está sendo aplicado: O children vai receber um React.ReactNode eo que isso implica: que ele aceita todo componente que o REACT consegue renderizar
}

export default function Background({children}: BackgroundPropriedades){
    const insets = useSafeAreaInsets();
    return (
        <LinearGradient
        colors={[colors.firstColorDegrader, colors.secundaryColorDegrader]}
        start={{x: 0, y: 0}}
        end={{x:1, y: 1}}
        style={[
            styles.container,{
                paddingTop: insets.top,
                paddingBottom: insets.bottom
            }
        ]}
        >
            {children}
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    }
})