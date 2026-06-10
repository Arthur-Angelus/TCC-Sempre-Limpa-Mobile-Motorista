import api from "./api";
import { obterMotoristaLogado } from "./authService";

export async function buscarDadosHome() {
    const motorista = await obterMotoristaLogado();

    const response = await api.get(
        `/home/${motorista.motorista_id}`
    );

    return response.data;
}