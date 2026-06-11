import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";


interface menuFooterPropriedades{  
    telaAtual: 'Home' | 'Acompanhamento' | 'Extrato' | 'Perfil';
}

export default function menuFooter({
    telaAtual
}: menuFooterPropriedades) {
    const navigation = useNavigation<any>()

    const renderizarBotao = (
        nomeDaRota: string,
        nomeDoIcone: keyof typeof MaterialCommunityIcons.glyphMap,
        label: string
    ) => {
        const estaAtivo = telaAtual === nomeDaRota;
        const corCorrente = estaAtivo ? colors.primary : colors.grayIcon
    

    return (
            <TouchableOpacity
                style={style.botao}
                onPress={() => navigation.navigate(nomeDaRota)}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                name={estaAtivo ? nomeDoIcone : `${nomeDoIcone}-outline` as any || nomeDoIcone}
                size={25}
                color={corCorrente}
                />
                <Text style={[style.texto, {color: corCorrente, fontWeight: estaAtivo ? 'bold' : 'normal'}]}>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            {renderizarBotao('Inicio', 'home', 'Início')}
            {renderizarBotao('Acompanhamento', 'washing-machine', 'Acompanhamento')}
            {renderizarBotao('Extrato', 'clipboard-text', 'Extrato')}
            {renderizarBotao('Perfil', 'account', 'Perfil')}
        </View>
    )
}

const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.background,
            paddingHorizontal: 20,
            paddingTop: 10,
          
            paddingBottom: Platform.OS === 'ios' ? 25 : 10, 
            borderTopWidth: 1,
            borderTopColor: colors.strokeForFilter,
        },
        botao: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        texto: {
            fontSize: 12,
            marginTop: 4,
        }
    });