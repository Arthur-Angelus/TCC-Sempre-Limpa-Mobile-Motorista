import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors'; // Ajuste o caminho

interface CardDashboardProps {
    // Dados da Gota
    numeroPedido: string;
    statusTexto: string;
    progresso: number;
    mensagem: string;
    onVerDetalhes: () => void;
    
    // Dados da Folha (Agora com espaço para Litros/kW e Valor em R$)
    cestosLavados: number;
    reaisEconomizadosTotais: string;
    economiaAguaVolume: string; // Ex: "45L"
    economiaAguaReais: string;  // Ex: "R$ 4,50"
    economiaEnergiaKw: string;  // Ex: "2.1 kWh"
    economiaEnergiaReais: string; // Ex: "R$ 2,00"
    economiaInsumosReais: string; // Ex: "R$ 8,00"
    tempoPoupado: string;
}

export default function CardDashboard({
    numeroPedido,
    statusTexto,
    progresso,
    mensagem,
    onVerDetalhes,
    cestosLavados,
    reaisEconomizadosTotais,
    economiaAguaVolume,
    economiaAguaReais,
    economiaEnergiaKw,
    economiaEnergiaReais,
    economiaInsumosReais,
    tempoPoupado
}: CardDashboardProps) {
    
    const [abaAtiva, setAbaAtiva] = useState<'gota' | 'folha'>('gota');

    return (
        <View style={styles.containerGeral}>
            
            {/* 1. ÍCONES CIRCULARES FLUTUANTES ACIMA DO CARD E À ESQUERDA */}
            <View style={styles.containerAbas}>
                <TouchableOpacity 
                    onPress={() => setAbaAtiva('gota')} 
                    style={[styles.abaCirculo, abaAtiva === 'gota' && { backgroundColor: colors.primary || '#0056b3' }]}
                >
                    <MaterialCommunityIcons 
                        name="water-outline" 
                        size={22} 
                        color={abaAtiva === 'gota' ? '#FFF' : '#888'} 
                    />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={() => setAbaAtiva('folha')} 
                    style={[styles.abaCirculo, abaAtiva === 'folha' && { backgroundColor: '#28A745' }]}
                >
                    <MaterialCommunityIcons 
                        name="leaf" 
                        size={22} 
                        color={abaAtiva === 'folha' ? '#FFF' : '#888'} 
                    />
                </TouchableOpacity>
            </View>

            {/* 2. O CORPO DO CARD PRINCIPAL */}
            <View style={styles.cardBranco}>

                {/* ========================================== */}
                {/* ABA GOTA: STATUS DO PEDIDO                 */}
                {/* ========================================== */}
                {abaAtiva === 'gota' && (
                    <View style={styles.conteudo}>
                        
                        <View style={styles.linhaStatus}>
                            <View>
                                {/* TEXTO DO PEDIDO DENTRO DE UMA VIEW ARREDONDADA */}
                                <View style={styles.badgePedido}>
                                    <Text style={styles.textoBadge}>Pedido #{numeroPedido}</Text>
                                </View>
                                <Text style={styles.statusTexto}>{statusTexto}</Text>
                            </View>
                            
                            {/* MÁQUINA DE LAVAR QUE ENCHE */}
                            <View style={styles.containerIconeMaquina}>
                                <MaterialCommunityIcons 
                                    name="washing-machine" 
                                    size={40} 
                                    color="#E0E0E0" 
                                    style={styles.iconeFundo}
                                />
                                <View style={[styles.mascaraCorte, { height: `${progresso}%` }]}>
                                    <MaterialCommunityIcons 
                                        name="washing-machine" 
                                        size={40} 
                                        color={colors.primary || '#0056b3'} 
                                        style={styles.iconeFrente}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.linhaProgressoTxt}>
                            <Text style={styles.textoProgresso}>Progresso da lavagem</Text>
                            <Text style={styles.textoPorcentagem}>{progresso}%</Text>
                        </View>

                        <View style={styles.barraFundo}>
                            <View 
                                style={[
                                    styles.barraPreenchida, 
                                    { width: `${progresso}%`, backgroundColor: colors.primary || '#0056b3' }
                                ]} 
                            />
                        </View>

                        <View style={styles.linhaRodapeGota}>
                            <Text style={styles.mensagemGota}>{mensagem}</Text>
                            <TouchableOpacity onPress={onVerDetalhes}>
                                <Text style={styles.linkDetalhes}>Ver detalhes</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}

                {/* ========================================== */}
                {/* ABA FOLHA: LISTA VERTICAL DE IMPACTO       */}
                {/* ========================================== */}
                {abaAtiva === 'folha' && (
                    <View style={styles.conteudo}>
                        
                        <Text style={styles.textoBaseado}>Baseado em {cestosLavados} cestos lavados</Text>
                        <Text style={styles.textoDinheiro}>
                            R$ {reaisEconomizadosTotais} <Text style={styles.textoDinheiroSub}>economizados</Text>
                        </Text>

                        <View style={styles.listaVertical}>
                            
                            {/* LINHA: ÁGUA */}
                            <View style={styles.itemLinha}>
                                <View style={styles.itemEsquerda}>
                                    <View style={[styles.iconeFundoItem, { backgroundColor: 'rgba(0,162,232,0.1)' }]}>
                                        <MaterialCommunityIcons name="water" size={20} color="#00A2E8" />
                                    </View>
                                    <Text style={styles.labelLinha}>Água e Esgoto</Text>
                                </View>
                                <View style={styles.itemDireita}>
                                    <Text style={styles.valorVolume}>{economiaAguaVolume}</Text>
                                    <Text style={styles.valorReais}>≈ {economiaAguaReais}</Text>
                                </View>
                            </View>

                            {/* LINHA: ENERGIA */}
                            <View style={styles.itemLinha}>
                                <View style={styles.itemEsquerda}>
                                    <View style={[styles.iconeFundoItem, { backgroundColor: 'rgba(255,215,0,0.1)' }]}>
                                        <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FFB800" />
                                    </View>
                                    <Text style={styles.labelLinha}>Energia Elétrica</Text>
                                </View>
                                <View style={styles.itemDireita}>
                                    <Text style={styles.valorVolume}>{economiaEnergiaKw}</Text>
                                    <Text style={styles.valorReais}>≈ {economiaEnergiaReais}</Text>
                                </View>
                            </View>

                            {/* LINHA: INSUMOS */}
                            <View style={styles.itemLinha}>
                                <View style={styles.itemEsquerda}>
                                    <View style={[styles.iconeFundoItem, { backgroundColor: 'rgba(255,105,180,0.1)' }]}>
                                        <MaterialCommunityIcons name="molecule" size={20} color="#FF69B4" />
                                    </View>
                                    <Text style={styles.labelLinha}>Insumos de Lavagem</Text>
                                </View>
                                <View style={styles.itemDireita}>
                                    <Text style={styles.valorVolume}>-</Text>
                                    <Text style={styles.valorReais}>≈ {economiaInsumosReais}</Text>
                                </View>
                            </View>

                            {/* LINHA: TEMPO (DESTAQUE) */}
                            <View style={[styles.itemLinha, { borderBottomWidth: 0 }]}>
                                <View style={styles.itemEsquerda}>
                                    <View style={[styles.iconeFundoItem, { backgroundColor: 'rgba(40,167,69,0.1)' }]}>
                                        <MaterialCommunityIcons name="clock-outline" size={20} color="#28A745" />
                                    </View>
                                    <Text style={[styles.labelLinha, { fontWeight: 'bold' }]}>Tempo Poupado</Text>
                                </View>
                                <View style={styles.itemDireita}>
                                    <Text style={[styles.valorReais, { color: '#28A745', fontWeight: 'bold', fontSize: 16 }]}>
                                        {tempoPoupado}
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerGeral: {
        width: '100%',
        marginBottom: 20,
    },
    // --- ESTILOS DAS ABAS FLUTUANTES ---
    containerAbas: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 8, // Dá um pequeno respiro antes do card branco começar
    },
    abaCirculo: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 3, // Sombrinha suave nas abas
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    // --- ESTILOS DO CARD BRANCO ---
    cardBranco: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        width: '100%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    conteudo: {
        width: '100%',
    },
    // --- ESTILOS DA GOTA (PEDIDO) ---
    linhaStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    badgePedido: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 6,
    },
    textoBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
    },
    statusTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    containerIconeMaquina: {
        width: 40,
        height: 40,
        justifyContent: 'flex-end',
    },
    iconeFundo: {
        position: 'absolute',
        bottom: 0,
    },
    mascaraCorte: {
        width: 40,
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
    },
    iconeFrente: {
        position: 'absolute',
        bottom: 0,
    },
    linhaProgressoTxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    textoProgresso: {
        fontSize: 12,
        color: '#666',
    },
    textoPorcentagem: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    barraFundo: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 15,
    },
    barraPreenchida: {
        height: '100%',
        borderRadius: 4,
    },
    linhaRodapeGota: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mensagemGota: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    linkDetalhes: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary || '#0056b3',
    },
    // --- ESTILOS DA FOLHA (VERTICAL) ---
    textoBaseado: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    textoDinheiro: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#28A745',
        marginBottom: 15,
    },
    textoDinheiroSub: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',
    },
    listaVertical: {
        width: '100%',
    },
    itemLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    itemEsquerda: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconeFundoItem: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    labelLinha: {
        fontSize: 14,
        color: '#444',
    },
    itemDireita: {
        alignItems: 'flex-end',
    },
    valorVolume: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    valorReais: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    }
});