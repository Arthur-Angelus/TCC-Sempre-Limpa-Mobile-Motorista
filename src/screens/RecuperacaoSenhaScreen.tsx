import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Background from "../components/common/Background";
import CabecalhoFixo from "../components/common/CabecalhoFixo";
import CardAutenticacao from "../components/tela-login/cadastre-se/CardAutenticacao";
import InputMascarado from "../components/common/inputMascarado";
import BotaoPadrao from "../components/common/BotaoPadrao";

import { useRecuperacaoSenha } from "../hooks/useRecuperacaoSenha";
import { textos } from "../utils/strings";
import { colors } from "../theme/colors";

export default function RecuperacaoSenhaScreen() {
  const navigation = useNavigation<any>();

  const lidarComBotaoVoltar = () => {
    navigation.goBack();
  };

  const aoSucesso = () => {
    navigation.navigate('RedefinirSenha')
  }

  const { form, acoes } = useRecuperacaoSenha(aoSucesso);

  return (
    <Background>
      <CabecalhoFixo
        title={textos.appName}
        imagemCover={require("../assets/Logo.png")}
      />

      <CardAutenticacao
        titulo={textos.cardAuten.recuperacaoSenha}
        onBack={lidarComBotaoVoltar}
      >
        <View style={styles.formConteudo}>
          <InputMascarado
            label="Seu E-mail"
            placeholder="exemplo@email.com"
            valor={form.email}
            tipo="e_mail"
            aoMudarTexto={(mascarado, puro) => {
              // Como o campo é apenas e-mail, usamos o valor puro.
              form.setEmail(puro);
            }}
          />

          <View style={{ flex: 1 }} />

          {form.mensagemErro && (
            <View style={styles.caixaErro}>
              <Text style={styles.textoErro}>
                {form.mensagemErro}
              </Text>
            </View>
          )}

          {form.mensagemSucesso && (
            <View style={styles.caixaSucesso}>
              <Text style={styles.textoSucesso}>
                {form.mensagemSucesso}
              </Text>
            </View>
          )}

          <BotaoPadrao
            title={form.carregando ? "Enviando..." : "Continuar"}
            onPress={acoes.enviarRecuperacao}
          />
        </View>
      </CardAutenticacao>
    </Background>
  );
}

const styles = StyleSheet.create({
  formConteudo: {
    flex: 1,
  },

  caixaErro: {
    backgroundColor: colors.alertColorSistem,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.strokeForAlert,
  },

  textoErro: {
    color: colors.primaryColorAlertText,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },

  caixaSucesso: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },

  textoSucesso: {
    color: "#2E7D32",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});