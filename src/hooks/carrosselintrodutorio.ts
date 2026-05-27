import { useState, useRef, useCallback, useEffect } from "react";
import { ViewToken, FlatList } from "react-native";

export function useCarrossel(totalItens: number){
    const [imagemAtiva, setImagemAtiva] = useState(0)

    const carrosselRef = useRef<FlatList>(null)

    const itemVisivelMudando = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) =>{
        if(viewableItems.length > 0 && viewableItems[0].index !==null){
            setImagemAtiva(viewableItems[0].index);
        }
    }, [])

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 10
    }).current

    useEffect(() => {
        if (totalItens === 0) return

        const relogio = setInterval(() => {
            const proximoIndice = imagemAtiva === totalItens - 1 ? 0 : imagemAtiva +1

            carrosselRef.current?.scrollToIndex({
                index: proximoIndice,
                animated: true
            })

        }, 5000)
        
        return () => clearInterval(relogio)
    }, [imagemAtiva, totalItens])

    return {
        imagemAtiva,
        itemVisivelMudando,
        viewabilityConfig,
        carrosselRef
    }
}