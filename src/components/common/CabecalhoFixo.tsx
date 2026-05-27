import React from "react";
import { Text, StyleSheet, ImageSourcePropType, View, Image } from "react-native";
import { colors } from "../../theme/colors";


interface CabecalhoFixoPropiedades{
    title: string,
    imagemCover:  ImageSourcePropType
}

export default function CabecalhoFixo({title, imagemCover}: CabecalhoFixoPropiedades) {
    return (
        <View style={styles.container}>
            <Image source={imagemCover} style={styles.image} />
            <Text style={styles.titulo}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'transparent'
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 12
    },
    titulo:{
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.primary
    }
})