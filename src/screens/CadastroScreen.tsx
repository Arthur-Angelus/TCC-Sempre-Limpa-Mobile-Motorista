import React from 'react';
import CabecalhoFixo from '../components/common/CabecalhoFixo';
import Background from '../components/common/Background';
import BotaoPadrao from '../components/common/BotaoPadrao';
import InputMascarado from '../components/common/inputMascarado';
import { textos } from '../utils/strings';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardAutenticacao from '../components/tela-login/cadastre-se/CardAutenticacao';
import { useCadastro } from '../hooks/useCadastro';
import { colors } from '../theme/colors';

export default function CadastroScreen() {
    const navigation = useNavigation<any>()

    const {form, acoes, erros} = useCadastro()

    const lidarComBotaoVoltar = () => {
        if(form.etapaAtual === 1) {
            navigation.goBack()
        } else {
            acoes.voltarEtapa()
        }
    }

    const lidarComFinalizacao = async () => {
        const sucesso = await acoes.finalizarCadastro()

        if (sucesso){
            navigation.replace('Login')
        }
    }

    const renderizarEtapaAtual = () => {
        switch (form.etapaAtual) {
            case 1:
                return (
                    <View style={styles.etapaContainer}>
            <InputMascarado 
                label={textos.input.nome} 
                tipo='texto' 
                valor={form.nome} 
                aoMudarTexto={(texto) => {
                    if (texto !== form.nome) { 
                        form.setNome(texto);
                        acoes.limparErro('nome');
                    }
                }}
                erro={erros.nome}
            />
            <InputMascarado 
                label={textos.input.Email} 
                tipo='email' 
                valor={form.email} 
                aoMudarTexto={(texto) => {
                    if (texto !== form.email) {
                        form.setEmail(texto);
                        acoes.limparErro('email');
                    }
                }}
                erro={erros.email}
            />
            <InputMascarado 
                label={textos.input.telefone} 
                tipo='telefone' 
                valor={form.telefone} 
                aoMudarTexto={(texto) => {
                    if (texto !== form.telefone) {
                        form.setTelefone(texto);
                        acoes.limparErro('telefone');
                    }
                }}
                erro={erros.telefone}
            />
            <InputMascarado 
                label={textos.input.dataNascimento} 
                tipo="data" 
                valor={form.dataNascimento} 
                aoMudarTexto={(data) => {
                    if (data !== form.dataNascimento) {
                        form.setDataNascimento(data);
                        acoes.limparErro('dataNascimento');
                    }
                }}
                erro={erros.dataNascimento}
            />
            <InputMascarado 
                label={textos.input.cpf} 
                tipo="cpf" 
                valor={form.cpf} 
                aoMudarTexto={(cpf) => {
                    if (cpf !== form.cpf) {
                        form.setCpf(cpf);
                        acoes.limparErro('cpf');
                    }
                }}
                erro={erros.cpf}
            />
            <InputMascarado 
                label={textos.input.cnh} 
                tipo="cnh" 
                valor={form.cnh} 
                aoMudarTexto={(cnh) => {
                    if (cnh !== form.cnh) {
                        form.setCnh(cnh);
                        acoes.limparErro('cnh');
                    }
                }}
                erro={erros.cnh}
            />
        </View>
                )
            case 2:
                return (
                    <View style={styles.etapaContainer}>
                        <InputMascarado 
                            label="CEP" 
                            tipo="cep" 
                            valor={form.cep} 
                            aoMudarTexto={(textoMascara) => acoes.atualizarCep(textoMascara)} 
                            erro={erros.cep}
                        />
                        <InputMascarado 
                            label="Rua" 
                            tipo="texto" 
                            valor={form.rua} 
                            aoMudarTexto={(texto) => {
                                form.setRua(texto);
                                acoes.limparErro('rua');
                            }} 
                            editavel={form.rua === ''} 
                            erro={erros.rua}
                        />
                        <InputMascarado 
                            label="Bairro" 
                            tipo="texto" 
                            valor={form.bairro} 
                            aoMudarTexto={(texto) => {
                                form.setBairro(texto);
                                acoes.limparErro('bairro');
                            }} 
                            editavel={form.bairro === ''} 
                            erro={erros.bairro}
                        />
                        
                        <View style={styles.linhaDupla}>
                            <InputMascarado 
                                label="Cidade" 
                                tipo="texto" 
                                valor={form.cidade} 
                                aoMudarTexto={() => {}} 
                                containerStyle={{ flex: 1 }} 
                                editavel={form.cidade === ''} 
                                erro={erros.cidade}
                            />
                            <InputMascarado 
                                label="UF" 
                                tipo="texto" 
                                valor={form.estado} 
                                aoMudarTexto={() => {}} 
                                containerStyle={{ flex: 1 }} 
                                editavel={form.estado === ''} 
                                erro={erros.estado}
                            />
                        </View>

                        <View style={styles.linhaDupla}>
                            <InputMascarado 
                                label="Número" 
                                tipo="texto" 
                                valor={form.numero} 
                                aoMudarTexto={(numero) => {
                                    if(numero !== form.numero){
                                    form.setNumero(numero);
                                    acoes.limparErro('numero');
                                    }
                                }} 
                                containerStyle={{ flex: 0.4 }} 
                                erro={erros.numero}
                            />
                            <InputMascarado 
                                label="Complemento" 
                                tipo="texto" 
                                valor={form.complemento} 
                                aoMudarTexto={(complemento) => {
                                    if(complemento !== form.complemento){
                                    form.setComplemento(complemento);
                                    acoes.limparErro('complemento');
                                    }
                                }} 
                                containerStyle={{ flex: 1 }} 
                                erro={erros.complemento}
                            />
                        </View>
                    </View>
                )
            case 3:
                return (
                    <View style={styles.etapaContainer}>
                        <InputMascarado 
                            label="Insira uma senha" 
                            tipo="senha" 
                            valor={form.senha} 
                            aoMudarTexto={(mascarado, puro) => {
                                form.setSenha(puro);
                                acoes.limparErro('senha');
                            }} 
                            erro={erros.senha}
                        />
                        <Text style={styles.labelImagem}>Foto de Perfil (Obrigatorio)</Text>
                        <TouchableOpacity style={styles.botaoUploadImagem} activeOpacity={0.7}>
                            <Text style={styles.textoUpload}>Toque para escolher uma foto</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                return null;
        }
    }

    return (
        <Background>
            <CabecalhoFixo
            title={textos.appName}
            imagemCover={require('../assets/Logo.png')}/>

            <CardAutenticacao
            titulo= {textos.cardAuten.cadastra}
            onBack={lidarComBotaoVoltar}>
                <ScrollView 
                    style={styles.scroll} 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {renderizarEtapaAtual()}
                </ScrollView>
                    <BotaoPadrao
                        title={form.etapaAtual === 3 ? textos.botao.finalizar : textos.botao.continuar}
                        onPress={form.etapaAtual === 3 ? lidarComFinalizacao : acoes.avancarEtapa}
                    />
            </CardAutenticacao>
        </Background>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        
    },
    container: {
        flex: 1,
     
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        
        borderBottomWidth: 1,
        
        elevation: 2,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    botaoVoltar: {
        paddingRight: 15,
    },
    headerTextos: {
        flex: 1,
    },
    tituloHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    subtituloHeader: {
        fontSize: 14,
        color: '#007AFF', 
        fontWeight: '500'
    },
    senha: {
        fontSize: 20,
        color: colors.grayIcon,
        fontWeight: 'bold'
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40, 
    },
    etapaContainer: {
        flex: 1,
    },
    tituloEtapa: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 25,
    },
    linhaDupla: {
        flexDirection: 'row',
        gap: 15, 
    },
    labelImagem: {
        fontSize: 15,
        color: '#666',
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 10
    },
    botaoUploadImagem: {
        width: '100%',
        height: 160,
        backgroundColor: '#f1f3f5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#ced4da'
    },
    textoUpload: {
        marginTop: 12,
        color: '#6c757d',
        fontWeight: '500',
        fontSize: 14
    },
    rodape: {
        padding: 20,
      
        borderTopWidth: 1,
        borderTopColor: '#ebebeb',
    },
    botaoAcao: {
        backgroundColor: '#007AFF', 
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoFinalizar: {
        backgroundColor: '#28a745', 
    },
    textoBotaoAcao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5
    }
});
