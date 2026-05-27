import { useNavigation } from "@react-navigation/native";
import { mensagensDeERRO } from "../utils/erros";
import { validarEmail, validarSenha, validarCpf } from "../utils/validacoes";
import { useState } from "react"; 
import { realizarLogin } from "../services/authService";

export function useLogin(metodoInicial: 'cpf' | 'email', aoSucesso: () => void){
    //Responsavel pela navegação entre páginas
    const navigation = useNavigation<any>()

    //Constantes de uso de estado, podendo variar como na primeira constante
    const [metodoEscolhido] = useState<'cpf' | 'email'>(metodoInicial)
    const [identificacao, setIdentificacao] = useState('')
    const [identificacaoPuro, setIdentificacaoPuro] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagemErro, setMensagemErro] = useState<string | null>(null)

    //Lógica dinamica para a UI
    const labelDinamico = metodoEscolhido === 'cpf' ? 'Seu CPF' : 'Seu E-mail'
    const placeholderDinamico = metodoEscolhido === 'cpf' ? 'CPF: 000.000.000-00' : 'exemplo@email.com'

    
    const lidarComLogin = async () => {
        setMensagemErro(null)

        if(metodoEscolhido === 'email'){
            if(!validarEmail(identificacaoPuro)){
                setMensagemErro (mensagensDeERRO.validacao.emailInvalido)
                return
            }
           } else {
            if(!validarCpf(identificacaoPuro)){
                setMensagemErro (mensagensDeERRO.validacao.cpfInvalido)
                return
            }
           }

           if(!validarSenha(senha)){
            setMensagemErro(mensagensDeERRO.validacao.senhaFraca)
            return
           }

           try {
            const data = await realizarLogin(identificacaoPuro, senha, metodoEscolhido)
            aoSucesso()
           } catch (error: any) {
            setMensagemErro(mensagensDeERRO.api.servidorForaDoAr || error.message)
           }
        }

    return {
        form: {
            metodoEscolhido,
            identificacao,
            identificacaoPuro,
            senha,
            labelDinamico,
            mensagemErro,
            placeholderDinamico,
            setIdentificacao,
            setIdentificacaoPuro,
            setSenha
        },
        acoes: {
            lidarComLogin
        }
    }
}