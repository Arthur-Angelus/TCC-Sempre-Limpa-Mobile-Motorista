import { useEffect, useState } from "react";
import { buscarPerfilMotorista } from "../services/authService";


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

const normalizeImageUrl = (url?: string | null) => {
    if (!url) return null;
  
    return url.replace("localhost", "10.107.144.20");
  };

export function usePerfil() {
    const [motorista, setMotorista] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);

    const carregarPerfil = async () => {
        try {
            setLoading(true);
            setMensagemErro(null);

            const data = await buscarPerfilMotorista();

            console.log("DADOS RECEBIDOS:", data);

            const m = data?.items?.motoristas;

            if (!m) {
                setMensagemErro("Dados do motorista não encontrados.");
                return;
            }

            // 🔥 MAPEAMENTO DIRETO DA VIEW (SEM PERDER NADA)
            setMotorista({
                // dados pessoais
                motorista_id: m.motorista_id,
                nome: m.nome,
                email: m.email,
                telefone: m.telefone,
                cpf: m.cpf,
                // 🛠️ FORMATANDO A DATA NO FRONT PARA GARANTIR:

                dataNascimento: formatarDataBR(m.data_nascimento || m.dataNascimento),
                foto: normalizeImageUrl(m.foto),

                // endereço
                endereco_motorista_id: m.endereco_motorista_id,
                cep: m.cep,
                logradouro: m.logradouro,
                numero: m.numero,
                complemento: m.complemento,
                bairro: m.bairro,
                cidade: m.cidade,
                uf: m.uf,

                // banco
                dados_bancarios_id: m.dados_bancarios_id,
                banco: m.banco,
                tipo_conta: m.tipo_conta,
                agencia: m.agencia,
                conta: m.conta,
                digito: m.digito,

                // veículo
                veiculo_id: m.veiculo_id,
                modalidade: m.modalidade,
                dados_veiculo_id: m.dados_veiculo_id,
                marca: m.marca,
                modelo: m.modelo,
                placa: m.placa,
                cor: m.cor,
                ano_fabricacao: m.ano_fabricacao,
                ano_modelo: m.ano_modelo
            });

        } catch (error: any) {
            setMensagemErro(error.message || "Erro ao carregar perfil");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarPerfil();
    }, []);

    return {
        form: {
            Motorista: motorista,
            loading,
            mensagemErro
        },
        acoes: {
            carregarPerfil
        }
    };
}