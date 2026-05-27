import React from "react";
import { View, StyleSheet } from 'react-native';
import { colors } from "../../theme/colors";

interface PaginacaoPropriedades{
    total: number;
    indiceAtivo: number
}

export default function Paginacao({ total, indiceAtivo}: PaginacaoPropriedades){
    const arrayItens = Array.from({length : total})

    return (
        <View style= {styles.container}>
            {arrayItens.map((_, index)=> (
                <View
                key={index}
                style= {[
                    styles.bolinha,
                    indiceAtivo === index && styles.bolinhaAtiva  
                     ]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  bolinha: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C0C0C0',
    marginHorizontal: 4,
  },
  bolinhaAtiva: {
    width: 50,
    backgroundColor: colors.primary,
  },
})