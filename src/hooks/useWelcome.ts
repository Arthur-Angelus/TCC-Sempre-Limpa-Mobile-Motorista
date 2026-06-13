import { useState } from "react"; 
import { useNavigation } from "@react-navigation/native";

export function selectUseLogin(){
    const [modalVisivel, setModalVisivel] = useState(false)
    const navigation = useNavigation<any>()

    const abrirModal = () => setModalVisivel(true)
    const fecharModal = () => setModalVisivel(false)

    const usuarioSelecionouItem = (metodo: 'cpf' | 'email') => {
        setModalVisivel(false)
        
        navigation.navigate('Login', {metodoSelecionado: metodo})

    }

    return {
        modalVisivel,
        abrirModal,
        fecharModal,
        usuarioSelecionouItem
    }
}