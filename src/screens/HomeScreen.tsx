import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importações dos seus componentes customizados (Ajuste os caminhos se necessário)
import Background from '../components/common/Background';
import HeaderHome from '../components/tela-home/HeaderHome';
import CardDashboard from '../components/tela-home/CardDashboard';
import BotaoPadrao from '../components/common/BotaoPadrao';
import { colors } from '../theme/colors';
import CardPedido from "../components/tela-home/CardPedido";

// Importação do ícone de adicionar (Ajuste o caminho se necessário)
// import IconeAdd from '../assets/add-icon.svg'
// import IconeCesto from '../assets/cesto-icon.svg'

// Importação do hook personalizado para buscar dados da home
import { useHome } from "../hooks/useHome";
import { buscarPerfilMotorista } from '../services/authService';

export function HomeScreen() {
    const navigation = useNavigation<any>();

    const { dados, carregando, erro } = useHome();
    console.log("Dados da HomeScreen:", dados);

    const pedidoAtual = dados.find(
        pedido => pedido.status_pedido === 'EM_ANDAMENTO'
    );

    function formatarStatus(status: string) {
    switch (status) {
        case 'EM_ANDAMENTO':
            return 'Andamento';

        case 'PENDENTE':
            return 'Pendente';

        case 'PAGO':
            return 'Finalizado';

        case 'FINALIZADO':
            return 'Finalizado';

        case 'CANCELADO':
            return 'Cancelado';

        default:
            return status;
    }
}

    // Funções de disparo para testar os cliques dos botões
    function lidarComNotificacao() {
        console.log("Sino de notificações pressionado!");
    }

    function lidarComDetalhesPedido() {
        console.log("Usuário quer ver detalhes do pedido atual...");
        // navigation.navigate('DetalhesPedido');
    }

    function lidarComNovoPedido() {
        console.log("Iniciando fluxo de novo pedido...");
        // navigation.navigate('CriarPedido');
    }
    const ultimosPedidos = dados
        .filter(
            pedido => pedido.status_pedido !== 'EM_ANDAMENTO'
        )
        .slice(0, 3);

    return (
        <Background>
            {/* 1. TOPO DO APLICATIVO */}
            <HeaderHome
                nomeUsuario="Guilherme"
                urlFotoPerfil="" // Deixe vazio para testar a imagem padrão circular
                onPressNotificacao={lidarComNotificacao}
            />

            {/* Usamos o ScrollView para garantir que o conteúdo role perfeitamente em telas menores */}
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteudoEspacamento}
            >

                {/* 2. CARD DO DASHBOARD (O Camaleão: Gota vs Folha) */}
                {/* Passamos dados mocados idênticos ao figma para validar a estrutura visual */}
                {pedidoAtual ? (
                    <CardDashboard
                        numeroPedido={String(pedidoAtual.pedido_id)}
                        statusTexto="Em processamento"
                        progresso={50}
                        mensagem="Sua roupa está sendo lavada."
                        onVerDetalhes={lidarComDetalhesPedido}

                        cestosLavados={pedidoAtual.quantidade_cestos}

                        reaisEconomizadosTotais="0"
                        economiaAguaVolume="0L"
                        economiaAguaReais="R$ 0,00"
                        economiaEnergiaKw="0 kWh"
                        economiaEnergiaReais="R$ 0,00"
                        economiaInsumosReais="R$ 0,00"
                        tempoPoupado="0h"
                    />
                ) : (
                    <View style={styles.semPedidoAtual}>
                        <Text style={styles.semPedidoAtualTitulo}>
                            Nenhum pedido em andamento
                        </Text>

                        <Text style={styles.semPedidoAtualTexto}>
                            Quando você realizar uma lavagem, o acompanhamento aparecerá aqui.
                        </Text>
                    </View>
                )}

                {/* 3. ÁREA DE SEÇÃO OU ELEMENTOS EXTRAS */}
                <View style={styles.secaoAcoes}>

                    <View style={styles.espacadorBotao}>
                        <BotaoPadrao
                            // icon={<IconeAdd width={20} height={20} fill="#FFFFFF" />}
                            title="Solicitar Nova Lavagem"
                            onPress={lidarComNovoPedido}
                            backgroundColor={colors.primary || colors.iconAndTextSelectColor}
                            // style={{ height: 60 }}
                        />
                    </View>
                </View>
                <View style={styles.ultimosPedidosContainer}>
                    <View style={styles.tituloSecaoContainer}>
                        <Text style={styles.ultimosPedidos}>
                            Últimos Pedidos
                        </Text>
                        <Text style={styles.verTodos}>
                            Ver todos
                        </Text>
                    </View>
                    <View style={styles.ultimosPedidosLista}>
                        {ultimosPedidos.length > 0 ? (
                            ultimosPedidos.map((pedido) => (
                                <CardPedido
                                    key={pedido.pedido_id}
                                    // icon={
                                    //     <IconeCesto
                                    //         width={24}
                                    //         height={24}
                                    //         fill={colors.backgroundGray}
                                    //     />
                                    // }
                                    numeroPedido={String(pedido.pedido_id)}
                                    data={new Date(
                                        pedido.data_pedido
                                    ).toLocaleDateString('pt-BR')}
                                    quantidadeItens={`${pedido.quantidade_cestos} cestos`}
                                    status={formatarStatus(pedido.status_pedido)}
                                />
                            ))
                        ) : (
                            <Text style={styles.nenhumPedido}>
                                Você ainda não possui nenhum pedido.
                            </Text>
                        )}
                    </View>
                </View>

            </ScrollView>
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
});