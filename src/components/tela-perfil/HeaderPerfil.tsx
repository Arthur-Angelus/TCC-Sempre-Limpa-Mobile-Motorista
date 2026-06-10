import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import BotaoPadrao from "../common/BotaoPadrao";
import { colors } from "../../theme/colors";
import { textos } from "../../utils/strings";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HeaderHomePropriedades {
    onPressVoltar?: () => void
    titulo : string
    onPressEditar?: () => void
}

export default function HeaderPerfil ({
    onPressVoltar,
    titulo,
    onPressEditar
}: HeaderHomePropriedades) {

    return(
        <View style={styles.container}>
    
          <TouchableOpacity
            onPress={onPressVoltar}
            style={styles.botao}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color={colors.textGray}
            />
          </TouchableOpacity>
    
          <Text style={styles.titulo}>
            {titulo}
          </Text>
    
          <TouchableOpacity
            onPress={onPressEditar}
            style={styles.botao}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color={colors.textGray}
            />
          </TouchableOpacity>
    
        </View>
      )
    }
    
    const styles = StyleSheet.create({
    
      container: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
      },
    
      botao: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      titulo: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.textGray,
      }
})
  