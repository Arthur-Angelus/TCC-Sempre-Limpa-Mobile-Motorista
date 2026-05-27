import React, { useState } from "react";
import {View, FlatList, Image, StyleSheet, useWindowDimensions} from "react-native"
import Paginacao from "./Paginacao";
import { useCarrossel } from "../../hooks/carrosselintrodutorio";

interface CarrosselPropriedades{
    dados: { id: string; source: any } [];
}

export default function Carrossel({dados}: CarrosselPropriedades) {
    const [imagemAtiva, setImagemAtiva] = useState(0)

    const { width } = useWindowDimensions();

    const larguraItem = width * 0.8
    const espacoLateral = 10

    const tamanhoDeslocamento = larguraItem + (espacoLateral * 2)

    const {
      carrosselRef,
      itemVisivelMudando,
      viewabilityConfig
    } = useCarrossel(dados.length)

    const handleScroll = (event: any) =>{
        const posicaoScroll = event.nativeEvent.contentOffset.x
        const indexAtual = Math.round(posicaoScroll / tamanhoDeslocamento);
        setImagemAtiva(indexAtual)
    }
    return (
        <View style={styles.container}>
      <FlatList 
        ref= {carrosselRef}
        data={dados}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: espacoLateral }} 
        
        
        snapToInterval={tamanhoDeslocamento} 
        decelerationRate="fast" 
        onScroll={handleScroll} 
        scrollEventThrottle={16} 

        onViewableItemsChanged={itemVisivelMudando}
        viewabilityConfig={viewabilityConfig}

        getItemLayout={(data, index) =>({
          length: tamanhoDeslocamento,
          offset: tamanhoDeslocamento * index,
          index
        })}
        
        renderItem={({ item }) => (
           <Image 
             source={item.source} 
             
             style={[styles.imagem, { width: larguraItem, marginHorizontal: espacoLateral }]} 
           />
        )}
      />

      <Paginacao total={dados.length} indiceAtivo={imagemAtiva} />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 32, 
  },
  imagem: {
    height: 250, 
    borderRadius: 12, 
    backgroundColor: '#E0E0E0', 
  }
});