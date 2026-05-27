import React from "react";
import { View, Image,Text, StyleSheet, TouchableOpacity } from "react-native";
import { textos } from "../../utils/strings";
import { colors } from "../../theme";
import {Feather} from '@expo/vector-icons'

interface HeaderHomePropriedades{
    nomeUsuario: string
    urlFotoPerfil?: string
    onPressNotificacao: () => void
}

export default function HeaderHome({
    nomeUsuario,
    urlFotoPerfil,
    onPressNotificacao
}: HeaderHomePropriedades) {
    const imagemPadrao = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

    return (
        <View style={styles.container}>
            <View style= {styles.perfilContainer}>
                <Image 
                source={{uri: urlFotoPerfil ? urlFotoPerfil : imagemPadrao}}
                style={styles.imagemPerfil}
                />
                <View style={styles.textosContainer}>
                    <Text style={styles.saudacao}>{textos.home.bemvindo},</Text>
                    <Text style={styles.nome} numberOfLines={1}>
                        {nomeUsuario}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.botaoNotificacao}
                onPress={onPressNotificacao}
                activeOpacity={0.7}
            >
                <Feather name="bell" size={25} color={colors.iconAndTextSelectColor || "#FFF"}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    perfilContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, 
    },
    imagemPerfil: {
        width: 50,
        height: 50,
        borderRadius: 25, 
        backgroundColor: '#E0E0E0', 
    },
    textosContainer: {
        marginLeft: 12,
        flex: 1, 
    },
    saudacao: {
        fontSize: 12,
        color: colors.iconAndTextSelectColor, 
        fontWeight: 'bold'
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary, 
    },
    botaoNotificacao: {
        padding: 8, 
        position: 'relative',
    },
    bolinhaNotificacao: {
        position: 'absolute',
        top: 8,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red', 
    }
});