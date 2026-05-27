import React from "react";
import { View, StyleSheet,
Text, TouchableOpacity, 
useWindowDimensions, Image } from "react-native";
import { colors } from "../../../theme/colors";

interface CardAutenticacaoPropriedades {
    titulo: string
    onBack: () => void
    children: React.ReactNode
}

export default function CardAutenticacao({titulo, onBack, children}: CardAutenticacaoPropriedades){
    const {width, height} = useWindowDimensions()
    return (
        <View style={[styles.container,{width: width * 0.8, height: height * 0.75}]}>

            <View style={styles.headerCard}>
                <TouchableOpacity onPress={onBack} style={styles.botaoVoltar}>
                    <Image
                    source={require('../../../assets/Icon.png')}
                    style= {styles.iconeFlecha}
                    resizeMode="contain"/>
                </TouchableOpacity>

                <Text style={styles.titulo}>{titulo}</Text>
            </View>

            <View style={styles.conteudo}>
                {children}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.autenticCard,
        borderRadius: 10,
        padding: 24,
        alignSelf: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5 
    },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    botaoVoltar: {
        padding: 8,
        marginLeft: -8,
        marginRight: 12
    },
    iconeFlecha: {
        width: 20,
        height: 20,
        tintColor: colors.iconColorArrow
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.text,
        flex: 1
    },
    conteudo: {
        flex: 1
    }
})