import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../theme";

interface Props {
    status: 'OFFLINE' | 'DISPONIVEL' | 'OCUPADO';
    onPress: () => void;
}

export default function BotaoStatusMotorista({ status, onPress }: Props) {

    const isOnline = status === 'DISPONIVEL';

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[
                styles.button,
                isOnline ? styles.online : styles.offline
            ]}
        >
            <Text style={[
                styles.text,
                isOnline ? styles.textOnline : styles.textOffline
            ]}>
                {isOnline ? "Disponível" : "Ficar Online"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 30,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },

    // 🔴 OFFLINE (modo neutro)
    offline: {
        backgroundColor: colors.backgroundGray,
        borderWidth: 1,
        borderColor: colors.borderGray,
    },

    // 🟢 ONLINE (modo ativo iFood-like)
    online: {
        backgroundColor: colors.primary,
    },

    text: {
        fontSize: 15,
        fontWeight: "600",
    },

    textOffline: {
        color: colors.textGray,
    },

    textOnline: {
        color: colors.defaultText,
    },
});