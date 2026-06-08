import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback} from "react-native"
import BotaoPadrao from "../common/BotaoPadrao";
import { colors } from "../../theme/colors";
import { textos } from "../../utils/strings";

interface BottomSheetLoginPropriedades {
    visivel: boolean,
    aoFechar: () => void,
    aoSelecionarMetodo: (metodo: 'cpf' | 'email') => void;
}

export default function BottomSheetlogin({ visivel, aoFechar, aoSelecionarMetodo}: BottomSheetLoginPropriedades){
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visivel}
        onRequestClose={aoFechar}>
            
       
            <TouchableWithoutFeedback onPress={aoFechar}>
                <View style={styles.fundoEscuro}>
                    
                
                    <TouchableWithoutFeedback>
                        <View style={styles.caixaBranca}>
                            
                            <TouchableOpacity onPress={aoFechar} activeOpacity={0.7} style={styles.areaClicavelTraco}>
                                <View style={styles.tracinhoArrastar}/>
                            </TouchableOpacity>
                            
                            <Text style={styles.titulo}>
                                {textos.bottomSheet.login}
                            </Text>
                            
                            <View style={styles.containerBotoes}>
                                <BotaoPadrao
                                  title={textos.botao.cpf}
                                  onPress={() => aoSelecionarMetodo("cpf")}
                                />

                                <View style={{ height: 16}}/>

                                <BotaoPadrao
                                  title={textos.botao.email}
                                  backgroundColor="transparent"
                                  textColor={colors.primary}
                                  borderColor={colors.primary}
                                  onPress={() => aoSelecionarMetodo('email')}
                                />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
   

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
  fundoEscuro: {
    flex: 1,
 
    justifyContent: 'flex-end', 
  },
  caixaBranca: {
    backgroundColor: colors.background, 
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    elevation: 10,
  },
  areaClicavelTraco: {
    paddingVertical: 10, 
    alignItems: 'center',
    marginBottom: 10,
  },
  tracinhoArrastar: {
    width: 40,
    height: 4,
    backgroundColor: '#D0D0D0',
    borderRadius: 2,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  containerBotoes: {
    paddingHorizontal: 10,
  }
});