const BASE_URL = "http://localhost:5000/v1/semprelimpa/";

import { obterTokenSalvo } from './authService';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    motorista_id: number;
    email: string;
    exp: number;
}

export const buscarPerfilMotorista = async () => {
    const token = await obterTokenSalvo();

    if (!token) {
        throw new Error("Nenhum token de autenticação encontrado");
    }

    const decoded = jwtDecode<JwtPayload>(token);
    console.log("===> PAYLOAD DO JWT DECODIFICADO", decoded);
    const idDoMotorista = decoded.motorista_id;
    console.log("===> ID EXTRAÍDO DO TOKEN", idDoMotorista);

    if (!idDoMotorista) {
        throw new Error("ID do motorista não encontrado no token.");
    }

    //  CORRIGIDO: Agora usa a BASE_URL e passa o id extraído do token dinamicamente (/Motorista/1)
    const url = `${BASE_URL}motorista/${idDoMotorista}`;
    console.log("=== REQUISIÇÃO ENVIADA PARA:", url);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //  CORRIGIDO: De "Autorization" para "Authorization" (com 'h')
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensagemErro || "Erro ao buscar motorista");
    }

    return data;
};