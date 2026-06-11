import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";

// Importações dos seus componentes customizados (Ajuste os caminhos se necessário)
import Background from '../components/common/Background';
import HeaderHome from '../components/tela-home/HeaderHome';
import CardDashboard from '../components/tela-home/CardDashboard';
import BotaoPadrao from '../components/common/BotaoPadrao';
import { colors } from '../theme/colors';
import CardPedido from "../components/tela-home/CardPedido";
import BotãoStatus from "../components/common/BotãoStatus"; //import do botão status

// Importação do ícone de adicionar (Ajuste o caminho se necessário)
// import IconeAdd from '../assets/add-icon.svg'
// import IconeCesto from '../assets/cesto-icon.svg'

// Importação do hook personalizado para buscar dados da home
import { useHome } from "../hooks/useHome";
import { buscarPerfilMotorista } from '../services/authService';

export function HomeScreen() {
    const navigation = useNavigation<any>();
    const {
        motorista,
        status,
        alterarStatus,
        iniciarTracking,
        localizacao
    } = useHome();

    useEffect(() => {
        if (status === "DISPONIVEL") {
            iniciarTracking();
        }
    }, [status]);

    return (
        <Background>

            <HeaderHome
                nomeMotorista={motorista?.nome || ""}
                urlFotoPerfil={motorista?.foto}
                onPressNotificacao={() => { }}
            />

            {/* 🔘 BOTÃO STATUS (IFOOD STYLE) */}
            <View style={styles.statusContainer}>
                <BotãoStatus
                    status={status}
                    onPress={() =>
                        alterarStatus(
                            status === "DISPONIVEL"
                                ? "OFFLINE"
                                : "DISPONIVEL"
                        )
                    }
                />
            </View>

            {/* 🗺️ MAPA CONDICIONAL */}
            {status === "DISPONIVEL" && (
                <View style={styles.mapaContainer}>

                    <MapView
                        style={{ flex: 1, width: "100%" }}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        region={
                            localizacao
                                ? {
                                    latitude: localizacao.latitude,
                                    longitude: localizacao.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }
                                : undefined
                        }
                    >
                        {localizacao && (
                            <Marker coordinate={localizacao} title="Você está aqui" />
                        )}
                    </MapView>

                </View>
            )}

            {/* 🔴 OFFLINE STATE */}
            {status === "OFFLINE" && (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineTexto}>
                        Você está offline
                    </Text>
                    <Text style={styles.offlineSub}>
                        Ative o modo disponível para receber pedidos
                    </Text>
                </View>
            )}

        </Background>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        marginTop: 15,
    },
    conteudoEspacamento: {
        paddingBottom: 30, // Garante que o conteúdo não fique escondido atrás do menu de abas inferior
    },
    secaoAcoes: {
        width: '100%',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Um fundo branco bem transparente para dar contraste no degradê
        borderRadius: 16,
        padding: 0,
    },
    tituloSecao: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 15,
    },
    espacadorBotao: {
        width: '100%'
    },
    ultimosPedidosContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 10
    },
    tituloSecaoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    ultimosPedidos: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    verTodos: {
        fontSize: 14,
        color: colors.textGray || colors.iconAndTextSelectColor,
    },
    ultimosPedidosLista: {
        width: '100%',
        marginTop: 10,
        gap: 20
    },
    nenhumPedido: {
        fontSize: 14,
        color: colors.textGray,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 100,
    },
    semPedidoAtual: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },

    semPedidoAtualTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },

    semPedidoAtualTexto: {
        marginTop: 8,
        textAlign: 'center',
        color: colors.textGray,
    },
    statusContainer: {
        marginTop: 10,
        alignItems: "center"
    },

    mapaContainer: {
        flex: 1,
        marginTop: 15,
        borderRadius: 20,
        backgroundColor: colors.secundaryColorCard,
        justifyContent: "center",
        alignItems: "center"
    },

    mapaTexto: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.textGray
    },

    offlineContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },

    offlineTexto: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.textGray
    },

    offlineSub: {
        marginTop: 8,
        fontSize: 14,
        color: colors.textSecundary,
        textAlign: "center"
    },
});