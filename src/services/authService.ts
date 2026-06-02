import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';

// Com o 'adb reverse tcp:5000 tcp:5000' ativo, use localhost tranquilamente
const BASE_URL = "http://localhost:5000/v1/semprelimpa/";
const TOKEN_KEY = 'motorista_logado_token';

interface JwtPayload {
    motorista_id: number;
    email: string;
    exp: number;
}


export const uploadFotoMotorista = async (asset: any) => {

    const formData = new FormData();

    if (Platform.OS === 'web') {

        formData.append(
            'foto',
            asset.file
        );

    } else {

        formData.append('foto', {
            uri: asset.uri,
            name: 'foto.jpg',
            type: 'image/jpeg'
        } as any);
    }

    const response = await fetch(
        `${BASE_URL}motorista/upload-foto`,
        {
            method: 'POST',
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Erro upload');
    }

    return data;
};

export async function esquecerSenha(email: string) {
    const response = await fetch(
      'http://localhost:5000/v1/semprelimpa/esquecisenhamotorista',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    )
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao solicitar recuperação de senha.')
    }
  
    return data
  }
  
  export async function resetarSenha(
    token: string,
    novaSenha: string
  ) {
    const response = await fetch(
      'http://localhost:5000/v1/semprelimpa/resetarsenhamotorista',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          novaSenha,
        }),
      }
    )
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(
        data.message || 'Erro ao resetar senha.'
      )
    }
  
    return data
  }

// ==========================================
//    FUNÇÕES DE GERENCIAMENTO DE TOKEN (CORRIGIDAS)
// ==========================================

export const salvarToken = async (token: string): Promise<void> => {
    try {
        if (Platform.OS === 'web') {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            // Só chama o SecureStore se NÃO for ambiente Web
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        }
        console.log("TOKEN GRAVADO COM SUCESSO!");
    } catch (error) {
        console.error("Erro ao salvar o token:", error);
    }
};

export const obterTokenSalvo = async (): Promise<string | null> => {
    try {
        if (Platform.OS === 'web') {
            return localStorage.getItem(TOKEN_KEY);
        } else {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        }
    } catch (error) {
        console.error("Erro ao obter token:", error);
        return null;
    }
};

export const verificarSeEstaLogado = async (): Promise<boolean> => {
    try {
        const token = await obterTokenSalvo();
        
        if (!token) return false;
        
        const decoded = jwtDecode<JwtPayload>(token);
        const tempoAtual = Date.now() / 1000;

        if (decoded.exp < tempoAtual) {
            console.warn("Sessão expirada.");
            await efetuarLogout();
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

export const efetuarLogout = async (): Promise<void> => {
    try {
        if (Platform.OS === 'web') {
            localStorage.removeItem(TOKEN_KEY);
        } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
    } catch (error) {
        console.error("Erro ao efetuar logout:", error);
    }
};


// ==========================================
//         FUNÇÕES DE REQUISIÇÃO DA API
// ==========================================

export const realizarLogin = async (identificacaoPuro: string, senha: string, metodoEscolhido: string) => {
    const endpoint = metodoEscolhido === 'email' ? "Loginemail" : "Logincpf";   
    
    const payload = metodoEscolhido === 'email'
        ? { email: identificacaoPuro, senha }
        : { cpf: identificacaoPuro, senha };
        
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.mensagemErro || "Erro ao fazer login");
    }

    if (data && data.token) {
        await salvarToken(data.token);
    }

    return data;
};

export const realizarCadastro = async (payloadParaAPI: any) => {
    const url = `${BASE_URL}motoristacompleto`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payloadParaAPI)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensagemErro || "Erro ao fazer cadastro");
    }
    
    return data;
};

export const buscarPerfilMotorista = async () => {
    const token = await obterTokenSalvo();
    if (!token) {
        throw new Error("Nenhum token de autenticação encontrado");
    }

    const decoded = jwtDecode<JwtPayload>(token);
    const idDomotorista = decoded.motorista_id;

    if (!idDomotorista) {
        throw new Error("ID do motorista não encontrado no token");
    }

    const url = `${BASE_URL}motorista/${idDomotorista}`; 

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensagemErro || "Erro ao buscar dados do perfil");
    }

    return data;
};