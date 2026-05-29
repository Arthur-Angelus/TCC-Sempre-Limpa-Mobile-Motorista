import { useState } from "react";
import { buscarCepViaCep } from "../services/viaCepService";
import { realizarCadastro } from "../services/authService";
import { mensagensDeERRO } from "../utils/erros";
import {
    apenasNumeros,
    formatarDataParaBanco,
    validarCep,
    validarCnh,
    validarCpf,
    validarEmail,
    validarMaiorIdade,
    validarSenha,
    validarTelefone
} from "../utils/validacoes";

type ModalidadeVeiculo = "carro" | "moto" | "bike" | "";

export function useCadastro() {

    const [erros, setErros] = useState<Record<string, string | null>>({});
    const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3 | 4 | 5>(1);

    // =========================
    // MOTORISTA
    // =========================
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cnh, setCnh] = useState("");

    // =========================
    // ENDEREÇO
    // =========================
    const [cep, setCep] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [complemento, setComplemento] = useState("");
    const [numero, setNumero] = useState("");
    const [buscarCep, setBuscarCep] = useState(false);

    // =========================
    // VEÍCULO
    // =========================
    const [modalidade, setModalidade] = useState<ModalidadeVeiculo>("");

    const [placa, setPlaca] = useState("");
    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [anoFabricacao, setAnoFabricacao] = useState("");
    const [anoModelo, setAnoModelo] = useState("");
    const [cor, setCor] = useState("");

    const veiculoEhCompleto = modalidade === "carro" || modalidade === "moto";

    const validarVeiculo = () => {
        let e: Record<string, string> = {};

        if (!modalidade) e.modalidade = "Selecione modalidade";

        if (modalidade === "bike") {
            if (!cor) e.cor = "Cor obrigatória";
            return Object.keys(e).length ? e : null;
        }

        if (!placa) e.placa = "Placa obrigatória";
        if (!modelo) e.modelo = "Modelo obrigatório";
        if (!marca) e.marca = "Marca obrigatória";
        if (!anoFabricacao) e.anoFabricacao = "Ano fabricação obrigatório";
        if (!anoModelo) e.anoModelo = "Ano modelo obrigatório";
        if (!cor) e.cor = "Cor obrigatória";

        return Object.keys(e).length ? e : null;
    };

    // =========================
    // DADOS BANCÁRIOS (NOVA ETAPA)
    // =========================
    const [banco, setBanco] = useState("");
    const [agencia, setAgencia] = useState("");
    const [conta, setConta] = useState("");
    const [digito, setDigito] = useState("");
    const [tipoConta, setTipoConta] = useState("");

    const validarBanco = () => {
        let e: Record<string, string> = {};

        if (!banco) e.banco = "Banco obrigatório";
        if (!agencia) e.agencia = "Agência obrigatória";
        if (!conta) e.conta = "Conta obrigatória";
        if (!digito) e.digito = "Dígito obrigatório";
        if (!tipoConta) e.tipoConta = "Tipo de conta obrigatório";

        return Object.keys(e).length ? e : null;
    };

    // =========================
    // SEGURANÇA (ETAPA 5)
    // =========================
    const [senha, setSenha] = useState("");
    const [foto, setFoto] = useState<string | null>(null);

    // =========================
    // HELPERS
    // =========================
    const limparErro = (campo: string) => {
        setErros((prev) => ({ ...prev, [campo]: null }));
    };

    // =========================
    // AVANÇAR ETAPA
    // =========================
    const avancarEtapa = () => {

        let e: Record<string, string> = {};

        // ETAPA 1 - MOTORISTA
        if (etapaAtual === 1) {

            if (nome.length < 3) e.nome = mensagensDeERRO.preencherCampo.nome;
            if (!validarEmail(email)) e.email = mensagensDeERRO.validacao.emailInvalido;
            if (!validarCpf(cpf)) e.cpf = mensagensDeERRO.validacao.cpfInvalido;
            if (!validarTelefone(telefone)) e.telefone = mensagensDeERRO.preencherCampo.telefone;
            if (!validarMaiorIdade(dataNascimento)) e.dataNascimento = mensagensDeERRO.preencherCampo.idade;

            if (Object.keys(e).length) return setErros(e);

            setErros({});
            setEtapaAtual(2);
        }

        // ETAPA 2 - ENDEREÇO
        else if (etapaAtual === 2) {

            if (!validarCep(cep)) e.cep = mensagensDeERRO.preencherCampo.cep;
            if (!rua) e.rua = "Rua obrigatória";
            if (!numero) e.numero = "Número obrigatório";
            if (!bairro) e.bairro = "Bairro obrigatório";

            if (Object.keys(e).length) return setErros(e);

            setErros({});
            setEtapaAtual(3);
        }

        // ETAPA 3 - VEÍCULO
        else if (etapaAtual === 3) {

            const veic = validarVeiculo();
            if (veic) return setErros(veic);

            setErros({});
            setEtapaAtual(4);
        }

        // ETAPA 4 - BANCO
        else if (etapaAtual === 4) {

            const bancoErr = validarBanco();
            if (bancoErr) return setErros(bancoErr);

            setErros({});
            setEtapaAtual(5);
        }
    };

    // =========================
    // FINALIZAR
    // =========================
    const finalizarCadastro = async () => {

        let e: Record<string, string> = {};

        if (!validarSenha(senha)) e.senha = "Senha fraca";

        const bancoErr = validarBanco();
        if (bancoErr) e = { ...e, ...bancoErr };

        const veic = validarVeiculo();
        if (veic) e = { ...e, ...veic };

        if (Object.keys(e).length) {
            setErros(e);
            return false;
        }

        const payload = {
            nome,
            data_nascimento: formatarDataParaBanco(dataNascimento),
            cpf: apenasNumeros(cpf),
            telefone: apenasNumeros(telefone),
            email,
            cnh,
            senha,
            foto,

            endereco: {
                cep: apenasNumeros(cep),
                logradouro: rua,
                numero,
                complemento,
                bairro,
                cidade,
                uf: estado
            },

            dadosBancarios: {
                banco,
                agencia,
                conta,
                digito,
                tipo_conta: tipoConta
            },

            veiculo: {
                modalidade,
                dados: veiculoEhCompleto
                    ? { placa, modelo, marca, ano_fabricacao: anoFabricacao, ano_modelo: anoModelo, cor }
                    : { cor }
            }
        };

        try {
            await realizarCadastro(payload);
            return true;
        } catch (err: any) {
            setErros({ geral: err.message });
            return false;
        }
    };

    // =========================
    // CEP
    // =========================
    const atualizarCep = async (valor: string) => {

        setCep(valor);
        limparErro("cep");

        const c = apenasNumeros(valor);

        if (c.length === 8) {
            setBuscarCep(true);

            const res = await buscarCepViaCep(c);

            if (res) {
                setRua(res.logradouro);
                setBairro(res.bairro);
                setCidade(res.localidade);
                setEstado(res.uf);
            }

            setBuscarCep(false);
        }
    };

    return {
        form: {
            etapaAtual,

            nome, email, telefone, cpf, dataNascimento, cnh,
            setNome, setEmail, setTelefone, setCpf, setDataNascimento, setCnh,

            cep, rua, numero, complemento, bairro, cidade, estado,
            setCep, setRua, setNumero, setComplemento, setBairro, setCidade, setEstado,

            modalidade, setModalidade,

            placa, modelo, marca, anoFabricacao, anoModelo, cor,
            setPlaca, setModelo, setMarca, setAnoFabricacao, setAnoModelo, setCor,

            banco, agencia, conta, digito, tipoConta,
            setBanco, setAgencia, setConta, setDigito, setTipoConta,

            senha,
            fotoUri: foto,
            setSenha,
            setFotoUri: setFoto,

            buscarCep
        },

        acoes: {
            avancarEtapa,
            voltarEtapa: () => {
                setErros({});
                setEtapaAtual((p) => (p > 1 ? (p - 1) as any : p));
            },
            finalizarCadastro,
            atualizarCep,
            limparErro
        },

        erros
    };
}