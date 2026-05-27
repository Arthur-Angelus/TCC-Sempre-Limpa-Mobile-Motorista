const BASE_URL = "http://localhost:5000/v1/SempreLimpa/";

import { obterTokenSalvo } from './authService';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    usuario_id: number;
    email: string;
    exp: number;
}

export const buscarPerfilUsuario = async () => {
    const token = await obterTokenSalvo();

    if (!token) {
        throw new Error("Nenhum token de autenticação encontrado");
    }

    const decoded = jwtDecode<JwtPayload>(token);
    console.log("===> PAYLOAD DO JWT DECODIFICADO", decoded);
    const idDoUsuario = decoded.usuario_id;
    console.log("===> ID EXTRAÍDO DO TOKEN", idDoUsuario);

    if (!idDoUsuario) {
        throw new Error("ID do usuário não encontrado no token.");
    }

    //  CORRIGIDO: Agora usa a BASE_URL e passa o id extraído do token dinamicamente (/usuario/1)
    const url = `${BASE_URL}usuario/${idDoUsuario}`;
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
        throw new Error(data.mensagemErro || "Erro ao buscar usuário");
    }

    return data;
};