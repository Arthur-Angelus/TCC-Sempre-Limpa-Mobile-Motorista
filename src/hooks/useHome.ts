import { useEffect, useState } from "react";
import { buscarPerfilMotorista, atualizarStatusMotorista, atualizarLocalizacaoMotorista } from "../services/authService";
import * as Location from "expo-location";
import { useRef } from "react";
import { buscarPedidosMotorista } from "../services/authService";

export function useHome() {
    type StatusMotorista = 'OFFLINE' | 'DISPONIVEL' | 'OCUPADO';

    const [motorista, setMotorista] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [status_motorista, setStatusMotorista] = useState<StatusMotorista>('OFFLINE');
    const [localizacao, setLocalizacao] = useState<any>(null);
    const [pedidoAtivo, setPedidoAtivo] = useState<any>(null);

    // =========================
    // PERFIL
    // =========================
    async function carregarPerfil() {
        try {
            setLoading(true);

            const response = await buscarPerfilMotorista();
            await carregarPedido();

            const m = response.items?.motoristas;

            setMotorista(m);
            setStatusMotorista(m.status_motorista || 'OFFLINE');

        } catch (error: any) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }

    // =========================
    // ALTERAR STATUS
    // =========================
    async function alterarStatus(novoStatus: StatusMotorista) {
        // 🚫 se estiver ocupado, não pode mudar nada
        if (status_motorista === "OCUPADO") return;
    
        // 🚫 impede setar OCUPADO direto por botão
        if (novoStatus === "OCUPADO") return;
    
        // 🚫 impede troca inválida (segurança extra)
        if (
            (status_motorista === "OFFLINE" && novoStatus === "DISPONIVEL") ||
            (status_motorista === "DISPONIVEL" && novoStatus === "OFFLINE")
        ) {
            await atualizarStatusMotorista(novoStatus);
            setStatusMotorista(novoStatus);
        }
    }

    async function setOcupado() {
        await atualizarStatusMotorista("OCUPADO");
        setStatusMotorista("OCUPADO");
    }

    async function finalizarCorrida() {
        await atualizarStatusMotorista("DISPONIVEL");
        setStatusMotorista("DISPONIVEL");
    }

    // =========================
    // LOCALIZAÇÃO (SÓ SE DISPONIVEL)
    // =========================
    const subscription = useRef<Location.LocationSubscription | null>(null);

    async function iniciarTracking() {
    if (subscription.current) return; // 🚨 evita duplicar tracking

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        throw new Error("Permissão de localização negada");
    }

    subscription.current = await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 5000,
            distanceInterval: 10
        },
        async (location) => {
            if (
                status_motorista !== "DISPONIVEL" &&
                status_motorista !== "OCUPADO"
            ) return;

            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };

            setLocalizacao(coords);

            await atualizarLocalizacaoMotorista(coords);
        }
    );
}

    function pararTracking() {
        if (subscription.current) {
            subscription.current.remove();
            subscription.current = null;
        }
    }

    async function carregarPedido() {
        try {
            const response = await buscarPedidosMotorista();
    
            const pedido = response?.items?.pedidos?.find(
                (p: any) => p.status_pedido !== "ENTREGUE"
            );
    
            setPedidoAtivo(pedido || null);
    
            // 🔥 SE TIVER PEDIDO, FORÇA OCUPADO
            if (pedido) {
                setStatusMotorista("OCUPADO");
            }
    
        } catch (error) {
            console.log("Erro pedido:", error);
        }
    }

    useEffect(() => {
        carregarPerfil();
    }, []);

    useEffect(() => {
        if (status_motorista === "DISPONIVEL" || status_motorista === "OCUPADO") {
            iniciarTracking();
        } else {
            pararTracking();
        }

        return () => pararTracking();
    }, [status_motorista]);


    useEffect(() => {
        const interval = setInterval(() => {
            if (status_motorista === "OCUPADO") {
                carregarPedido();
            }
        }, 5000);
    
        return () => clearInterval(interval);
    }, [status_motorista]);

    return {
        motorista,
        loading,
        erro,
        status: status_motorista,
        alterarStatus,
        setOcupado,
        finalizarCorrida,
        localizacao,
        pedidoAtivo,
        recarregar: carregarPerfil
    };
}