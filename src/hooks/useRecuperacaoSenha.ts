import { useState } from 'react'
import { validarEmail } from '../utils/validacoes'
import { mensagensDeERRO } from '../utils/erros'
import { esquecerSenha } from '../services/authService'

export function useRecuperacaoSenha(aoSucesso: () => void) {
  const [email, setEmail] = useState('')
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const enviarRecuperacao = async () => {
    setMensagemErro(null)
    setMensagemSucesso(null)

    if (!validarEmail(email)) {
      setMensagemErro(mensagensDeERRO.validacao.emailInvalido)
      return
    }

    try {
      setCarregando(true)

      const resposta = await esquecerSenha(email)

      console.log('Sucesso:', resposta)

      setMensagemSucesso(
        'Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.'
      )

      aoSucesso()
    } catch (error: any) {
      console.log('Erro:', error)

      setMensagemErro(
        error.message || 'Erro ao conectar com o servidor.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return {
    form: {
      email,
      mensagemErro,
      mensagemSucesso,
      carregando,
      setEmail,
    },
    acoes: {
      enviarRecuperacao,
    },
  }
}