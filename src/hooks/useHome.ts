import { useEffect, useState } from "react";
import { buscarPerfilMotorista, atualizarStatusMotorista, atualizarLocalizacaoMotorista } from "../services/authService";
import * as Location from "expo-location";

export function useHome() {
    const [motorista, setMotorista] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [status_motorista, setStatusMotorista] = useState<'OFFLINE' | 'DISPONIVEL' | 'OCUPADO'>('OFFLINE');
    const [localizacao, setLocalizacao] = useState<any>(null);

    // =========================
    // PERFIL
    // =========================
    async function carregarPerfil() {
        try {
            setLoading(true);

            const response = await buscarPerfilMotorista();

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
    async function alterarStatus(novoStatus: 'OFFLINE' | 'DISPONIVEL' | 'OCUPADO') {
        try {
            await atualizarStatusMotorista(novoStatus);
            setStatusMotorista(novoStatus);
        } catch (error: any) {
            setErro(error.message);
        }
    }

    // =========================
    // LOCALIZAÇÃO (SÓ SE DISPONIVEL)
    // =========================
    let subscription: Location.LocationSubscription | null = null;

    async function iniciarTracking() {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            throw new Error("Permissão de localização negada");
        }

        subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 5000,
                distanceInterval: 10
            },
            async (location) => {
                if (status_motorista !== "DISPONIVEL") return;

                const coords = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
            
                // 🔥 atualiza estado local (UI / mapa)
                setLocalizacao(coords);
            
                // 🔥 envia pro backend
                await atualizarLocalizacaoMotorista(coords);
            }
        );
    }

    function pararTracking() {
        if (subscription) {
            subscription.remove();
            subscription = null;
        }
    }

    useEffect(() => {
        carregarPerfil();
    }, []);

    return {
        motorista,
        loading,
        erro,
        status: status_motorista,
        alterarStatus,
        iniciarTracking,
        pararTracking,
        localizacao,
        recarregar: carregarPerfil
    };
}