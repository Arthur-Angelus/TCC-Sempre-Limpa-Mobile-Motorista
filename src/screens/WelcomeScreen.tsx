//Componentes
import CabecalhoFixo from '../components/common/CabecalhoFixo';
import BotaoPadrao from "../components/common/BotaoPadrao";
import Background from "../components/common/Background";
import Carrossel from "../components/tela-inicial/Carrossel";
import BottomSheetlogin from "../components/tela-inicial/BottomSheetLogin";

//UI/UX
import React from "react";
import { View, Text, StyleSheet} from "react-native";
import {textos} from "../utils/strings";
import { colors } from "../theme/colors";

//Logica: 
import { selectUseLogin } from '../hooks/useWelcome';
import { useNavigation } from '@react-navigation/native';

const carrosselImagens = [
    {id: '1', source: require('../assets/SempreLimpaCarrosel1.png') },
    {id: '2', source: require('../assets/SempreLimpaCarrosel2.png') },
    {id: '3', source: require('../assets/SempreLimpaCarrosel3.png') },
]

export default function WelcomeScreen(){
  const navigation = useNavigation<any>()
  const {modalVisivel, abrirModal, fecharModal, usuarioSelecionouItem} = selectUseLogin()

    return (
        <Background>
            <CabecalhoFixo
            title={textos.appName}
            imagemCover={require('../assets/Logo.png')}
            />
            
                <View style={styles.conteudo}>
                    <Carrossel dados={carrosselImagens} />
                    <Text style={styles.subTitulo}>
                      {textos.telaIntrodutoria.subTitulo}
                    </Text>
                    
                        <Text style={styles.textoNormal}>
                          {textos.descricao.inicio}
                          <Text style={styles.textoNegrito}>{textos.descricao.meio}</Text>
                          {textos.descricao.fim}
                        </Text>
              
                      <BotaoPadrao
                        title={textos.botao.entrar}
                        backgroundColor={colors.primary}
                        textColor={colors.defaultText}
                        onPress={abrirModal}/>
                      
                      <BotaoPadrao
                      title={textos.botao.cadastrase}
                      backgroundColor="transparent"
                      textColor={colors.primary}
                      borderColor={colors.primary}
                      onPress={() => navigation.navigate('Cadastro')}/>

                    <View style={styles.rodape}>
                        <Text style={styles.textoRodape}>
                            {textos.telaIntrodutoria.direitos}
                        </Text>
                    </View>
                </View>
            <BottomSheetlogin
            visivel={modalVisivel}
            aoFechar={fecharModal}
            aoSelecionarMetodo={usuarioSelecionouItem}/>
        </Background>
    )
}

const styles = StyleSheet.create({
  paginacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitulo: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    gap: 16
  },
  textoNormal: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    
  },
  textoNegrito: {
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
    color: colors.primary,
  },
  textoDestaque: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  rodape: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 40
  },
  textoRodape: {
    fontSize: 12,
    color: colors.textSecundary, 
  }
});