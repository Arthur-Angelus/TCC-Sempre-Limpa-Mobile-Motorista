import { useState } from 'react'
import { validarSenha } from '../utils/validacoes'
import { mensagensDeERRO } from '../utils/erros'
import { resetarSenha } from '../services/authService'

export function useResetarSenha(
  aoSucesso: () => void
) {
  const [token, setToken] = useState('')
  const [novaSenha, setNovaSenha] = useState('')

  const [mensagemErro, setMensagemErro] =
    useState<string | null>(null)

  const [mensagemSucesso, setMensagemSucesso] =
    useState<string | null>(null)

  const [carregando, setCarregando] =
    useState(false)

  const enviarResetSenha = async () => {
    setMensagemErro(null)
    setMensagemSucesso(null)

    if (!token) {
      setMensagemErro('Informe o token.')
      return
    }

    if (!validarSenha(novaSenha)) {
      setMensagemErro(
        mensagensDeERRO.validacao.senhaFraca
      )
      return
    }

    try {
      setCarregando(true)

      await resetarSenha(token, novaSenha)

      setMensagemSucesso(
        'Senha redefinida com sucesso.'
      )

      aoSucesso()
    } catch (error: any) {
      setMensagemErro(
        error.message || 'Erro ao resetar senha.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return {
    form: {
      token,
      novaSenha,
      mensagemErro,
      mensagemSucesso,
      carregando,
      setToken,
      setNovaSenha,
    },

    acoes: {
      enviarResetSenha,
    },
  }
}