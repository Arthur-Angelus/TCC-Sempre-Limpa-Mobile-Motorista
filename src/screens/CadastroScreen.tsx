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

    const { form, acoes, erros } = useCadastro()

    const lidarComBotaoVoltar = () => {
        if (form.etapaAtual === 1) {
            navigation.goBack()
        } else {
            acoes.voltarEtapa()
        }
    }

    const lidarComFinalizacao = async () => {
        const sucesso = await acoes.finalizarCadastro()

        if (sucesso) {
            navigation.replace('Login')
        }
    }

    const renderizarEtapaAtual = () => {
        switch (form.etapaAtual) {

            // =========================
            // ETAPA 1 - MOTORISTA
            // =========================
            case 1:
                return (
                    <View style={styles.etapaContainer}>
                        <InputMascarado label={textos.input.nome} tipo="texto" valor={form.nome}
                            aoMudarTexto={(t) => { form.setNome(t); acoes.limparErro('nome'); }}
                            erro={erros.nome}
                        />

                        <InputMascarado label={textos.input.Email} tipo="email" valor={form.email}
                            aoMudarTexto={(t) => { form.setEmail(t); acoes.limparErro('email'); }}
                            erro={erros.email}
                        />

                        <InputMascarado label={textos.input.telefone} tipo="telefone" valor={form.telefone}
                            aoMudarTexto={(t) => { form.setTelefone(t); acoes.limparErro('telefone'); }}
                            erro={erros.telefone}
                        />

                        <InputMascarado label={textos.input.dataNascimento} tipo="data" valor={form.dataNascimento}
                            aoMudarTexto={(t) => { form.setDataNascimento(t); acoes.limparErro('dataNascimento'); }}
                            erro={erros.dataNascimento}
                        />

                        <InputMascarado label={textos.input.cpf} tipo="cpf" valor={form.cpf}
                            aoMudarTexto={(t) => { form.setCpf(t); acoes.limparErro('cpf'); }}
                            erro={erros.cpf}
                        />

                        <InputMascarado label={textos.input.cnh} tipo="cnh" valor={form.cnh}
                            aoMudarTexto={(t) => { form.setCnh(t); acoes.limparErro('cnh'); }}
                            erro={erros.cnh}
                        />
                    </View>
                );

            // =========================
            // ETAPA 2 - ENDEREÇO
            // =========================
            case 2:
                return (
                    <View style={styles.etapaContainer}>
                        <InputMascarado label="CEP" tipo="cep" valor={form.cep}
                            aoMudarTexto={acoes.atualizarCep}
                            erro={erros.cep}
                        />

                        <InputMascarado label="Rua" tipo="texto" valor={form.rua}
                            aoMudarTexto={(t) => { form.setRua(t); acoes.limparErro('rua'); }}
                            editavel={form.rua === ''}
                            erro={erros.rua}
                        />

                        <InputMascarado label="Bairro" tipo="texto" valor={form.bairro}
                            aoMudarTexto={(t) => { form.setBairro(t); acoes.limparErro('bairro'); }}
                            editavel={form.bairro === ''}
                            erro={erros.bairro}
                        />

                        <View style={styles.linhaDupla}>
                            <InputMascarado label="Cidade" tipo="texto" valor={form.cidade}
                                aoMudarTexto={() => { }}
                                editavel={form.cidade === ''}
                                containerStyle={{ flex: 1 }}
                                erro={erros.cidade}
                            />

                            <InputMascarado label="UF" tipo="texto" valor={form.estado}
                                aoMudarTexto={() => { }}
                                editavel={form.estado === ''}
                                containerStyle={{ flex: 1 }}
                                erro={erros.estado}
                            />
                        </View>

                        <View style={styles.linhaDupla}>
                            <InputMascarado label="Número" tipo="texto" valor={form.numero}
                                aoMudarTexto={(t) => { form.setNumero(t); acoes.limparErro('numero'); }}
                                containerStyle={{ flex: 0.4 }}
                                erro={erros.numero}
                            />

                            <InputMascarado label="Complemento" tipo="texto" valor={form.complemento}
                                aoMudarTexto={(t) => { form.setComplemento(t); acoes.limparErro('complemento'); }}
                                containerStyle={{ flex: 1 }}
                                erro={erros.complemento}
                            />
                        </View>
                    </View>
                );

            // =========================
            // ETAPA 3 - BANCO (MOVIDO PRA CÁ)
            // =========================
            case 3:
    return (
        <View style={styles.etapaContainer}>

            {/* =========================
                BANCO (ENUM)
            ========================= */}
            <Text style={{ marginBottom: 8, fontWeight: '600' }}>
                Selecione o banco
            </Text>

            <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                {['nubank', 'picpay', 'mercadopago'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        onPress={() => {
                            form.setBanco(item);
                            acoes.limparErro('banco');
                        }}
                        style={{
                            padding: 10,
                            borderRadius: 8,
                            backgroundColor: form.banco === item ? colors.primary : '#eee'
                        }}
                    >
                        <Text style={{
                            color: form.banco === item ? '#fff' : colors.primary,
                            textTransform: 'capitalize'
                        }}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {erros.banco && <Text style={{ color: 'red' }}>{erros.banco}</Text>}

            {/* =========================
                TIPO DE CONTA (ENUM)
            ========================= */}
            <Text style={{ marginTop: 20, marginBottom: 8, fontWeight: '600' }}>
                Tipo de conta
            </Text>

            <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                {['corrente', 'salario', 'poupanca'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        onPress={() => {
                            form.setTipoConta(item);
                            acoes.limparErro('tipoConta');
                        }}
                        style={{
                            padding: 10,
                            borderRadius: 8,
                            backgroundColor: form.tipoConta === item ? colors.primary : '#eee'
                        }}
                    >
                        <Text style={{
                            color: form.tipoConta === item ? '#fff' : colors.primary,
                            textTransform: 'capitalize'
                        }}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {erros.tipoConta && <Text style={{ color: 'red' }}>{erros.tipoConta}</Text>}

            {/* =========================
                CAMPOS DE CONTA
            ========================= */}
            <InputMascarado
                label="Agência"
                tipo="texto"
                valor={form.agencia}
                aoMudarTexto={(t) => {
                    form.setAgencia(t);
                    acoes.limparErro('agencia');
                }}
                erro={erros.agencia}
            />

            <InputMascarado
                label="Conta"
                tipo="texto"
                valor={form.conta}
                aoMudarTexto={(t) => {
                    form.setConta(t);
                    acoes.limparErro('conta');
                }}
                erro={erros.conta}
            />

            <InputMascarado
                label="Dígito"
                tipo="texto"
                valor={form.digito}
                aoMudarTexto={(t) => {
                    form.setDigito(t);
                    acoes.limparErro('digito');
                }}
                erro={erros.digito}
            />

        </View>
    );

            // =========================
            // ETAPA 4 - VEÍCULO + MODALIDADE
            // =========================
            case 4:
                return (
                    <View style={styles.etapaContainer}>

                        {/* =======================
                MODALIDADE PRIMEIRO
            ======================= */}
                        <InputMascarado
                            label="Modalidade (bike, carro, moto)"
                            tipo="texto"
                            valor={form.modalidade}
                            aoMudarTexto={(t: any) => {
                                form.setModalidade(t);
                                acoes.limparErro('modalidade');
                            }}
                            erro={erros.modalidade}
                        />

                        {/* =======================
                SÓ MOSTRA VEÍCULO SE ESCOLHER MODALIDADE
            ======================= */}
                        {form.modalidade !== '' && (
                            <>
                                {/* BIKE: só cor editável */}
                                {form.modalidade === 'bike' && (
                                    <View style={{ marginTop: 10 }}>
                                        <InputMascarado
                                            label="Cor"
                                            tipo="texto"
                                            valor={form.cor}
                                            aoMudarTexto={(t) => {
                                                form.setCor(t);
                                                acoes.limparErro('cor');
                                            }}
                                            erro={erros.cor}
                                        />

                                        <Text style={{ marginTop: 10, color: '#888' }}>
                                            Para bike, apenas a cor é necessária.
                                        </Text>
                                    </View>
                                )}

                                {/* CARRO / MOTO: tudo liberado */}
                                {(form.modalidade === 'carro' || form.modalidade === 'moto') && (
                                    <>
                                        <InputMascarado
                                            label="Placa"
                                            tipo="texto"
                                            valor={form.placa}
                                            aoMudarTexto={(t) => {
                                                form.setPlaca(t);
                                                acoes.limparErro('placa');
                                            }}
                                            erro={erros.placa}
                                        />

                                        <InputMascarado
                                            label="Modelo"
                                            tipo="texto"
                                            valor={form.modelo}
                                            aoMudarTexto={(t) => {
                                                form.setModelo(t);
                                                acoes.limparErro('modelo');
                                            }}
                                            erro={erros.modelo}
                                        />

                                        <InputMascarado
                                            label="Marca"
                                            tipo="texto"
                                            valor={form.marca}
                                            aoMudarTexto={(t) => {
                                                form.setMarca(t);
                                                acoes.limparErro('marca');
                                            }}
                                            erro={erros.marca}
                                        />

                                        <InputMascarado
                                            label="Ano Fabricação"
                                            tipo="texto"
                                            valor={form.anoFabricacao}
                                            aoMudarTexto={(t) => {
                                                form.setAnoFabricacao(t);
                                                acoes.limparErro('anoFabricacao');
                                            }}
                                            erro={erros.anoFabricacao}
                                        />

                                        <InputMascarado
                                            label="Ano Modelo"
                                            tipo="texto"
                                            valor={form.anoModelo}
                                            aoMudarTexto={(t) => {
                                                form.setAnoModelo(t);
                                                acoes.limparErro('anoModelo');
                                            }}
                                            erro={erros.anoModelo}
                                        />

                                        <InputMascarado
                                            label="Cor"
                                            tipo="texto"
                                            valor={form.cor}
                                            aoMudarTexto={(t) => {
                                                form.setCor(t);
                                                acoes.limparErro('cor');
                                            }}
                                            erro={erros.cor}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </View>
                );

            // =========================
            // ETAPA 5 - SEGURANÇA
            // =========================
            case 5:
                return (
                    <View style={styles.etapaContainer}>

                        <InputMascarado
                            label="Senha"
                            tipo="senha"
                            valor={form.senha}
                            aoMudarTexto={(m, p) => {
                                form.setSenha(p);
                                acoes.limparErro('senha');
                            }}
                            erro={erros.senha}
                        />

                        <Text style={styles.labelImagem}>
                            Foto de Perfil (Obrigatório)
                        </Text>

                        <TouchableOpacity style={styles.botaoUploadImagem}>
                            <Text style={styles.textoUpload}>
                                Toque para escolher uma foto
                            </Text>
                        </TouchableOpacity>

                    </View>
                );
        }
    };

    return (
        <Background>
            <CabecalhoFixo
                title={textos.appName}
                imagemCover={require('../assets/Logo.png')} />

            <CardAutenticacao
                titulo={textos.cardAuten.cadastra}
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
                    title={form.etapaAtual === 5 ? textos.botao.finalizar : textos.botao.continuar}
                    onPress={form.etapaAtual === 5 ? lidarComFinalizacao : acoes.avancarEtapa}
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
