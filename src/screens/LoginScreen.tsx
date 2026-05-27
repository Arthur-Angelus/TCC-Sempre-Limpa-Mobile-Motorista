import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Background from "../components/common/Background";
import CabecalhoFixo from "../components/common/CabecalhoFixo";
import CardAutenticacao from "../components/tela-login/cadastre-se/CardAutenticacao";
import InputMascarado from "../components/common/inputMascarado";
import BotaoPadrao from "../components/common/BotaoPadrao";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLogin } from "../hooks/useLogin";
import { textos } from "../utils/strings";
import { colors } from "../theme/colors";

export default function LoginScreen() {
    const route = useRoute<any>()
    const navigation = useNavigation<any>()

    const metodoRecebido = route.params?.metodoSelecionado || 'e_mail'
    const aoLogarComSucesso = () => {
        navigation.navigate('AreaLogada')
    }

    const lidarComBotaoVoltar = () => {
        navigation.goBack()
    }

    const { form, acoes } = useLogin(metodoRecebido, aoLogarComSucesso)
    return (
        <Background>
            <CabecalhoFixo
                title={textos.appName}
                imagemCover={require('../assets/Logo.png')}
            />

            <CardAutenticacao
                titulo={textos.cardAuten.login}
                onBack={lidarComBotaoVoltar}>
                <View style={styles.formConteudo}>
                    <Text style={styles.textoEsqueciSenha}>
                        Insira o seu {metodoRecebido} e senha cadastrados para acessar sua conta
                    </Text>

                    <InputMascarado
                        label={form.labelDinamico}
                        placeholder={form.placeholderDinamico}
                        valor={form.identificacao}
                        tipo={form.metodoEscolhido}
                        aoMudarTexto={(mascarado, puro) => {
                            form.setIdentificacao(mascarado),
                                form.setIdentificacaoPuro(puro)
                        }}
                    />

                    <InputMascarado
                        label="Sua Senha"
                        placeholder="......."
                        valor={form.senha}
                        tipo="senha"
                        aoMudarTexto={(texto) => form.setSenha(texto)}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RecuperacaoSenha')}
                    >
                        <Text>Esqueci minha senha</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }} />

                    {form.mensagemErro && (
                        <View style={styles.caixaErro}>
                            <Text style={styles.textoErro}>{form.mensagemErro}</Text>
                        </View>
                    )}
                    <BotaoPadrao
                        title="Continuar"
                        onPress={acoes.lidarComLogin}
                    />

                </View>
            </CardAutenticacao>
        </Background>
    )
}

const styles = StyleSheet.create({
    formConteudo: {
        flex: 1,
    },
    esqueciSenha: {
        alignSelf: 'flex-end',
        marginTop: -10,
        paddingVertical: 10
    },
    textoEsqueciSenha: {
        marginBottom: 10,
        fontSize: 14,
        color: colors.textSecundary,
        fontWeight: '600'
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
        textAlign: 'center',
        fontWeight: '500',
    }
})