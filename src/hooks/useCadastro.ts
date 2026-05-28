import { useState } from "react";
import { buscarCepViaCep } from "../services/viaCepService"; 
import { realizarCadastro } from "../services/authService";
import { mensagensDeERRO } from "../utils/erros";
import { apenasNumeros, formatarDataParaBanco, validarCep, validarCnh, validarCpf, validarEmail, validarMaiorIdade, validarSenha, validarTelefone } from "../utils/validacoes";

export function useCadastro(){
    const [erros, setErros] = useState<Record<string, string | null>>({})
    const [etapaAtual, setEtapaAtual] = useState<1 | 2 | 3 | 4>(1) 
    const [mensagemErro, setMensagemErro] = useState<string | null>(null)

    const [nome, setNome] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [cpf, setCpf] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [cnh, setCnh] = useState("")



    const [cep, setCep] = useState("")
    const [bairro, setBairro] = useState("")
    const [rua, setRua] = useState("")
    const [estado, setEstado] = useState("")
    const [cidade, setCidade] = useState("")
    const [complemento, setComplemento] = useState("")
    const [numero, setNumero] = useState("")
    const [buscarCep, setBuscarCep] = useState(false)

    const [senha, setSenha] = useState("")
    const [foto, setFoto] = useState<string | null>(null)

    const limparErro = (campo: string) => {
        setErros((prev) => ({...prev, [campo]: null}))
    }

    const avancarEtapa = () => {
        let novosErros: Record<string, string> = {}

        if (etapaAtual === 1) {
            if(nome.trim().length < 3  || nome.trim().length > 100) novosErros.nome = mensagensDeERRO.preencherCampo.nome
            if(!validarEmail(email)) novosErros.email = mensagensDeERRO.validacao.emailInvalido
            if(!validarCpf(cpf)) novosErros.cpf =mensagensDeERRO.validacao.cpfInvalido
            if(!validarTelefone(telefone)) novosErros.telefone = mensagensDeERRO.preencherCampo.telefone
            if(!validarMaiorIdade(dataNascimento)) novosErros.dataNascimento =mensagensDeERRO.preencherCampo.idade
            if(!validarCnh(cnh)) novosErros.cnh =mensagensDeERRO.validacao.cnhInvalido
            

            if(Object.keys(novosErros).length > 0) {
                setErros(novosErros)
                return
            }

            setErros({})
            setEtapaAtual(2)
        }
        else if (etapaAtual === 2) {
            if(!validarCep(cep)) novosErros.cep = mensagensDeERRO.preencherCampo.cep
            if(rua.trim() === '') novosErros.rua = mensagensDeERRO.preencherCampo.rua
            if(numero.trim() === '') novosErros.numero = mensagensDeERRO.preencherCampo.numero
            if(bairro.trim() === '') novosErros.bairro = mensagensDeERRO.preencherCampo.bairro
            
            if (Object.keys(novosErros).length > 0) {
                setErros(novosErros);
                return;
            }

            setErros({});
            setEtapaAtual(3)
        }
    }

    const finalizarCadastro = async () => {
        let novosErros: Record<string, string> = {};

        if(!validarSenha(senha)) novosErros.senha = mensagensDeERRO.validacao.senhaFraca

        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros);
            return false;
        }

        setErros({})

        const payloadParaAPI = {
            nome,
            data_nascimento: formatarDataParaBanco(dataNascimento),
            cpf: apenasNumeros(cpf),
            telefone: apenasNumeros(telefone),
            email,
            cnh,
            foto: foto,
            senha,  
            endereco: { 
                cep: apenasNumeros(cep), 
                logradouro: rua, 
                numero, 
                complemento, 
                bairro, 
                cidade, 
                uf: estado 
            },
            
        };

        console.log("Payload padronizado para a API:", payloadParaAPI)

        try {
            const resposta = await realizarCadastro(payloadParaAPI)
            console.log("Sucesso na criação!", resposta);
            return true
        } catch (error: any) {
            console.error("Erro capturado no finalizarCadastro:", error.message);
            setErros(prev => ({ ...prev, geral: error.message }));
        
            return false;
        }
    }

    const voltarEtapa = () => {
        setErros({})
        if (etapaAtual > 1) {
            setEtapaAtual((prev) => (prev - 1) as 1| 2 | 3)
        }
    }

    const atualizarCep = async (cepDigitado: string) => {
        setCep(cepDigitado)
        limparErro('cep')

        const cepApenasNumeros = apenasNumeros(cepDigitado)

        if(cepApenasNumeros.length === 8) {
            setBuscarCep(true)
            setMensagemErro(null)

            const endereco = await buscarCepViaCep(cepApenasNumeros)

            if(endereco){
                setRua(endereco.logradouro)
                setBairro(endereco.bairro)
                setCidade(endereco.localidade)
                setEstado(endereco.uf)

                setErros((prev) => ({ ...prev, rua: null, bairro: null, cidade: null, estado: null }));
            } else {
                setErros((prev) => ({ ...prev, cep: mensagensDeERRO.preencherCampo.cep }));
            }

            setBuscarCep(false)
        }
    }

    return {
        form:{
            etapaAtual, mensagemErro, nome, email, telefone, cpf, dataNascimento, cnh,
            setNome, setEmail, setTelefone, setCpf, setDataNascimento, setCnh,
            cep, rua, numero, complemento, bairro, cidade, estado, buscarCep,
            setCep, setRua, setNumero, setComplemento, setBairro, setCidade, setEstado,
            senha, fotoUri: foto, setSenha, setFotoUri: setFoto
        },
        acoes: {avancarEtapa, voltarEtapa, finalizarCadastro, atualizarCep, limparErro},
        erros
    }
}