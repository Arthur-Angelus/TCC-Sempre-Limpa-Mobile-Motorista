import { useEffect, useState } from "react";
import { buscarPerfilUsuario } from "../services/usuarioService";


const formatarDataBR = (dataRaw: string | null | undefined): string => {
    if (!dataRaw) return '';
    try {
        // Se já vier formatada do back "DD/MM/AAAA", não mexe
        if (dataRaw.includes('/')) return dataRaw;
        
        // Se vier "2001-10-18T02:00:00.000Z"
        const apenasData = dataRaw.split('T')[0]; // "2001-10-18"
        const [ano, mes, dia] = apenasData.split('-');
        return `${dia}/${mes}/${ano}`;
    } catch {
        return dataRaw;
    }
};

export function usePerfil() {

    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        dataNascimento: '',
        cep: '',
        rua: '',
        bairro: '',
        estado: '',
        cidade: '',
        complemento: '',
        numero: ''
    })

    const [loading, setLoading] = useState(false)
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);

    const carregarPerfil = async () => {
        try {
            setLoading(true);
            setMensagemErro(null);
    
            const data = await buscarPerfilUsuario();
    
            if (data && data.items && data.items.Usuario && data.items.Usuario.length > 0) {
                const dadosBanco = data.items.Usuario[0]; 
    
                setUsuario({
                    nome: dadosBanco.nome || '',
                    email: dadosBanco.e_mail || dadosBanco.email || '',
                    telefone: dadosBanco.telefone || '',
                    cpf: dadosBanco.cpf || '',
                    
                    // 🛠️ FORMATANDO A DATA NO FRONT PARA GARANTIR:
                    dataNascimento: formatarDataBR(dadosBanco.data_nascimento || dadosBanco.dataNascimento),
                    
                    // Mapeamento do endereço baseado no que seu DAO devolve
                    cep: dadosBanco.cep || '',
                    rua: dadosBanco.logradouro || dadosBanco.rua || '',
                    bairro: dadosBanco.bairro || '',
                    estado: dadosBanco.uf || dadosBanco.estado || '',
                    cidade: dadosBanco.cidade || '',
                    complemento: dadosBanco.complemento || '',
                    numero: dadosBanco.numero || ''
                });
    
                console.log("ESTADO DO USUÁRIO ATUALIZADO COM SUCESSO!");
    
            } else {
                setMensagemErro("Dados do usuário não encontrados.");
            }
    
        } catch (error: any) {
            setMensagemErro(error.message || 'Erro ao carregar perfil');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarPerfil()
    }, [])

    return {
        form: {
            usuario,
            loading,
            mensagemErro
        },
        acoes: {
            carregarPerfil
        }
    }
} 