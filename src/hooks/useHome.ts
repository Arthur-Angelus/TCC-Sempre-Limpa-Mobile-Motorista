import { useEffect, useState } from "react";
import { buscarDadosHome } from "../services/homeService";

export function useHome() {
    const [dados, setDados] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function carregarHome() {
        try {
            setCarregando(true);

            const response = await buscarDadosHome();

            setDados(response.items.Usuario);
        } catch (error: any) {
            setErro(error.message);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarHome();
    }, []);

    return {
        dados,
        carregando,
        erro,
        recarregar: carregarHome
    };
}