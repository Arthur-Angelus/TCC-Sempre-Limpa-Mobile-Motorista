import React, { ReactNode } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

interface CardDefaultProps {
    numeroPedido: string;
    data: string;
    quantidadeItens: string;
    status: string;

    icon?: ReactNode;

    onPress?: () => void;
}

export default function CardDefault({
    numeroPedido,
    data,
    quantidadeItens,
    status,
    icon,
    onPress
}: CardDefaultProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >

            {/* LADO ESQUERDO */}
            <View style={styles.leftContent}>

                <View style={styles.iconContainer}>
                    {icon || (
                        <MaterialCommunityIcons
                            name="basket-outline"
                            size={38}
                            color={colors.primary}
                        />
                    )}
                </View>

                <View>
                    <Text style={styles.titulo}>
                        Pedido #{numeroPedido}
                    </Text>

                    <Text style={styles.subtitulo}>
                        {data} • {quantidadeItens}
                    </Text>
                </View>

            </View>

            {/* LADO DIREITO */}
            <View style={styles.rightContent}>

                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                        {status}
                    </Text>
                </View>

                <MaterialCommunityIcons
                    name="chevron-right"
                    size={28}
                    color="#C7CDD6"
                />

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',

        borderRadius: 14,

        paddingVertical: 15,
        paddingHorizontal: 18,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 6,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: 52,
        height: 52,

        borderRadius: 18,

        borderWidth: 1,
        borderColor: colors.borderGray,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: 18,

        backgroundColor: colors.backgroundGray
    },

    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,

        marginBottom: 6,
    },

    subtitulo: {
        fontSize: 12,
        color: colors.textGray,
    },

    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusContainer: {
        borderWidth: 1,
        borderColor: colors.borderGray,

        borderRadius: 6,

        paddingHorizontal: 10,
        paddingVertical: 4,

        marginRight: 10,
        marginBottom: 0,
    },

    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textGray,
    }
});