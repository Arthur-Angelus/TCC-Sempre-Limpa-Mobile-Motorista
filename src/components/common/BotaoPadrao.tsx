
import React, { ReactNode } from "react";
import { Text, StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { colors } from "../../theme/colors";

//Essa é uma forma de criação de um componente em react native: interface é o que é/será a interface do objeto

//Esse é o padrão ao se criar esse componente: uma string, uma funcao de ação ao clicar no botao, e opcionalmente um disable
interface BotaoPadraoPropriedades {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    icon?: ReactNode;
    style?: StyleProp<ViewStyle>
}

/*
Uma função realizada para ser default, ou seja, como o inicio/comum
*/
export default function BotaoPadrao({
    title,
    onPress,
    disabled = false,
    backgroundColor = colors.primary,
    textColor = colors.defaultText,
    borderColor,
    icon,
    style
}: BotaoPadraoPropriedades) {
    return (
        <TouchableOpacity
        style={[
            styles.button,
            { backgroundColor: backgroundColor},
            borderColor ? { borderWidth: 1, borderColor: borderColor} : null,
            disabled && styles.disabledButton,
            style
        ]}
        onPress={onPress}
        disabled={disabled}
        >
            <View style={styles.content}>
                {icon}
                <Text style={[styles.text, {color: textColor}]}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    disabledButton: {
        opacity: 0.7
    },
    text: {
        fontSize: 16,
        color: colors.defaultText,
        fontWeight: 'bold'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    }  
})