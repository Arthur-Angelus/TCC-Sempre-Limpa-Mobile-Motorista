import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity
} from "react-native";

import React, { useEffect, useState } from "react";
import Background from "../components/common/Background";
import { colors } from "../theme/colors";
import { usePerfil } from "../hooks/usePerfil";
import HeaderPerfil from "../components/tela-perfil/HeaderPerfil";
import { useNavigation } from "@react-navigation/native";
import BotaoPadrao from "../components/common/BotaoPadrao";
import { atualizarDadosBancarios, efetuarLogout } from "../services/authService";
import { atualizarPerfilMotorista, atualizarVeiculo } from "../services/authService";
import { atualizarEndereco, atualizarDadosVeiculo } from "../services/authService";

import {
  validarEmail,
  validarMaiorIdade,
  validarTelefone
} from "../utils/validacoes";

import { buscarCepViaCep } from "../services/viaCepService";

const formatarData = (data) => {
  if (!data) return null

  // DD/MM/YYYY
  if (data.includes('/')) {
      const [dia, mes, ano] = data.split('/')
      return `${ano}-${mes}-${dia}`
  }

  // DDMMYYYY
  if (/^\d{8}$/.test(data)) {
      const dia = data.substring(0, 2)
      const mes = data.substring(2, 4)
      const ano = data.substring(4, 8)

      return `${ano}-${mes}-${dia}`
  }

  return data
}


export default function PerfilScreen() {
  const navigation = useNavigation<any>()
  const [modoEdicao, setModoEdicao] = useState(false)
  const { form } = usePerfil()

  const [mensagemErro, setMensagemErro] = useState('')

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [cnh, setCnh] = useState('')

  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

  const [cep, setCep] = useState('')
  const [complemento, setComplemento] = useState('')
  const [numero, setNumero] = useState('')

  const [banco, setBanco] = useState('')
  const [tipo_conta, setTipoConta] = useState('')
  const [agencia, setAgencia] = useState('')
  const [conta, setConta] = useState('')
  const [digito, setDigito] = useState('')

  const [modalidade, setModalidade] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [placa, setPlaca] = useState('')
  const [cor, setCor] = useState('')
  const [ano_fabricacao, setano_fabricacao] = useState('')
  const [ano_modelo, setAnoModelo] = useState('')

  useEffect(() => {
    if (form.Motorista) {

      setNome(form.Motorista.nome)
      setEmail(form.Motorista.email)
      setTelefone(form.Motorista.telefone)
      setDataNascimento(form.Motorista.dataNascimento)
      setCnh(form.Motorista.cnh)

      setLogradouro(form.Motorista.logradouro)
      setBairro(form.Motorista.bairro)
      setCidade(form.Motorista.cidade)
      setUf(form.Motorista.uf)

      setCep(form.Motorista.cep)
      setComplemento(form.Motorista.complemento)
      setNumero(form.Motorista.numero)

      setBanco(form.Motorista.banco)
      setTipoConta(form.Motorista.tipo_conta)
      setAgencia(String(form.Motorista.agencia))
      setConta(String(form.Motorista.conta))
      setDigito(String(form.Motorista.digito))

      setModalidade(form.Motorista.modalidade)
      setMarca(form.Motorista.marca)
      setModelo(form.Motorista.modelo)
      setPlaca(form.Motorista.placa)
      setCor(form.Motorista.cor)

      setano_fabricacao(String(form.Motorista.ano_fabricacao))
      setAnoModelo(String(form.Motorista.ano_modelo))
    }
  }, [form.Motorista])


  if (!form || !form.Motorista) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    )
  }

  const buscarCep = async (cepDigitado: string) => {
    const cepLimpo = cepDigitado.replace(/\D/g, '')
    setCep(cepLimpo.slice(0, 8))

    if (cepLimpo.length !== 8) return

    try {
      const endereco: any = await buscarCepViaCep(cepLimpo)

      setLogradouro(endereco.logradouro || '')
      setBairro(endereco.bairro || '')
      setCidade(endereco.localidade || '')
      setUf(endereco.uf || '')

      setMensagemErro('')
    } catch (error) {
      setLogradouro('')
      setBairro('')
      setCidade('')
      setUf('')
      setMensagemErro('CEP não encontrado')
    }
  }

  const selecionarModalidade = (valor: string) => {
    setModalidade(valor)
  }

  const selecionarBanco = (valor: string) => {
    setBanco(valor)
  }

  const selecionarTipoConta = (valor: string) => {
    setTipoConta(valor)
  }

  return (
    <Background>

      <HeaderPerfil
        onPressVoltar={() => navigation.goBack()}
        titulo="Perfil"
        onPressEditar={() => {
          setModoEdicao(!modoEdicao)

          setNome(form.Motorista.nome)
          setEmail(form.Motorista.email)
          setTelefone(form.Motorista.telefone)
          setDataNascimento(form.Motorista.dataNascimento)
          setCnh(form.Motorista.cnh)

          setLogradouro(form.Motorista.logradouro)
          setBairro(form.Motorista.bairro)
          setCidade(form.Motorista.cidade)
          setUf(form.Motorista.uf)

          setCep(form.Motorista.cep)
          setComplemento(form.Motorista.complemento)
          setNumero(form.Motorista.numero)
        }}
      />

      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>

        {/* AVATAR (MANTIDO ORIGINAL) */}
        <View style={styles.avatarContainer}>
          <Image
            source={
              form.Motorista.foto
                ? { uri: form.Motorista.foto }
                : require("../assets/avatar-placeholder.png")
            }
            style={styles.avatar}
          />
        </View>

        {/* NOME */}
        {modoEdicao ? (
          <TextInput style={styles.inputNome} value={nome} onChangeText={setNome} />
        ) : (
          <Text style={styles.nome}>{nome}</Text>
        )}

        {/* DADOS MOTORISTA */}
        <View style={styles.informacoesContainer}>

          {modoEdicao ? (
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          ) : (
            <Text style={styles.info}>{email}</Text>
          )}

          {modoEdicao ? (
            <TextInput
              style={styles.input}
              value={telefone}
              keyboardType="numeric"
              onChangeText={(t) => setTelefone(t.replace(/\D/g, ''))}
            />
          ) : (
            <Text style={styles.info}>{telefone}</Text>
          )}

          <Text style={styles.info}>{form.Motorista.cpf}</Text>

          {modoEdicao ? (
            <TextInput style={styles.input} value={cnh} onChangeText={setCnh} />
          ) : (
            <Text style={styles.info}>{cnh}</Text>
          )}

          {modoEdicao ? (
            <TextInput
              style={styles.input}
              value={dataNascimento}
              onChangeText={(t) => setDataNascimento(t.replace(/\D/g, ''))}
            />
          ) : (
            <Text style={styles.info}>{dataNascimento}</Text>
          )}

        </View>

        <Text style={styles.titulos}>Endereço</Text>

        <View style={styles.informacoesContainer}>
          {modoEdicao ? (
            <TextInput style={styles.input} value={cep} onChangeText={buscarCep} />
          ) : (
            <Text style={styles.info}>{cep}</Text>
          )}

          <Text style={styles.info}>{logradouro}</Text>
          <Text style={styles.info}>{bairro}</Text>
          <Text style={styles.info}>{uf} - {cidade}</Text>

          {modoEdicao ? (
            <TextInput style={styles.input} value={complemento} onChangeText={setComplemento} />
          ) : (
            <Text style={styles.info}>{complemento}</Text>
          )}

          {modoEdicao ? (
            <TextInput style={styles.input} value={numero} onChangeText={(t) => setNumero(t.replace(/\D/g, ''))} />
          ) : (
            <Text style={styles.info}>Número {numero}</Text>
          )}
        </View>

        <Text style={styles.titulos}>Dados Bancários</Text>

        <View style={styles.informacoesContainer}>

          {/* BANCO ENUM */}
          {modoEdicao ? (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {['nubank', 'picpay', 'mercadopago'].map((b) => (
                <TouchableOpacity key={b} onPress={() => selecionarBanco(b)}>
                  <Text style={{ fontWeight: banco === b ? 'bold' : 'normal' }}>{b}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.info}>{banco}</Text>
          )}

          {/* TIPO CONTA ENUM */}
          {modoEdicao ? (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {['corrente', 'salario', 'poupanca'].map((t) => (
                <TouchableOpacity key={t} onPress={() => selecionarTipoConta(t)}>
                  <Text style={{ fontWeight: tipo_conta === t ? 'bold' : 'normal' }}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.info}>{tipo_conta}</Text>
          )}

          {modoEdicao ? (
            <TextInput style={styles.input} value={agencia} onChangeText={setAgencia} />
          ) : (
            <Text style={styles.info}>{agencia}</Text>
          )}

          {modoEdicao ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput style={[styles.input, { flex: 1 }]} value={conta} onChangeText={setConta} />
              <Text>-</Text>
              <TextInput style={[styles.input, { width: 60 }]} value={digito} onChangeText={setDigito} />
            </View>
          ) : (
            <Text style={styles.info}>{conta} - {digito}</Text>
          )}

        </View>

        <Text style={styles.titulos}>Dados do Veículo</Text>

        <View style={styles.informacoesContainer}>

          {/* MODALIDADE ENUM */}
          {modoEdicao ? (
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
              {['bike', 'motocicleta', 'carro'].map((m) => (
                <TouchableOpacity key={m} onPress={() => selecionarModalidade(m)}>
                  <Text style={{ fontWeight: modalidade === m ? 'bold' : 'normal' }}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.info}>{modalidade}</Text>
          )}

          {modoEdicao ? (
            <TextInput style={styles.input} value={marca} onChangeText={setMarca} />
          ) : (
            <Text style={styles.info}>{marca}</Text>
          )}

          {modoEdicao ? (
            <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />
          ) : (
            <Text style={styles.info}>{modelo}</Text>
          )}

          {modoEdicao ? (
            <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />
          ) : (
            <Text style={styles.info}>{placa}</Text>
          )}

          {modoEdicao ? (
            <TextInput style={styles.input} value={cor} onChangeText={setCor} />
          ) : (
            <Text style={styles.info}>{cor}</Text>
          )}

          {modoEdicao ? (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput style={[styles.input, { flex: 1 }]} value={ano_modelo} onChangeText={setAnoModelo} />
              <TextInput style={[styles.input, { flex: 1 }]} value={ano_fabricacao} onChangeText={setano_fabricacao} />
            </View>
          ) : (
            <Text style={styles.info}>{ano_modelo} - {ano_fabricacao}</Text>
          )}

        </View>

        {!modoEdicao && (
          <View style={styles.botaoLogout}>
            <BotaoPadrao
              title="LogOut"
              onPress={() => {
                try {
                  efetuarLogout()
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }],
                  })
                } catch (error) {
                  console.error("Erro ao efetuar logout:", error)
                }
              }}
              style={{ borderColor: 'transparent', width: 200, height: 55 }}
              icon={
                <Image
                  source={require("../assets/log-out.png")}
                  style={{ width: 24, height: 24, tintColor: '#fff' }}
                />
              }
            />
          </View>
        )}

      </ScrollView>

      {modoEdicao && (
        <View style={styles.botoes}>
          <BotaoPadrao
            title="Salvar Alterações"
            onPress={async () => {

              setMensagemErro("")

              try {

                console.log('1 - Atualizando endereço')

                await atualizarEndereco(
                  form.Motorista.endereco_motorista_id,
                  {
                    cep,
                    logradouro,
                    bairro,
                    uf: uf,
                    cidade,
                    complemento,
                    numero
                  }
                )

                console.log('2 - Endereço atualizado')

                console.log('3 - Atualizando dados bancários')

                console.log(
                  'DADOS BANCARIOS ID:',
                  form.Motorista.dados_bancarios_id
                )

                console.log(
                  'VEICULO ID:',
                  form.Motorista.veiculo_id
                )

                console.log(
                  'DADOS VEICULO ID:',
                  form.Motorista.dados_veiculo_id
                )

                await atualizarDadosBancarios(
                  form.Motorista.dados_bancarios_id,
                  {
                    banco,
                    tipo_conta,
                    agencia,
                    conta,
                    digito
                  }
                )

                console.log('4 - Dados bancários atualizados')

                console.log('5 - Atualizando veículo')

                await atualizarVeiculo(
                  form.Motorista.veiculo_id,
                  {
                    modalidade
                  }
                )

                console.log('6 - Veículo atualizado')

                console.log('7 - Atualizando dados veículo')

                await atualizarDadosVeiculo(
                  form.Motorista.dados_veiculo_id,
                  {
                    placa,
                    modelo,
                    marca,
                    ano_modelo,
                    ano_fabricacao,
                    cor
                  }
                )

                console.log('8 - Dados veículo atualizados')

                console.log('9 - Atualizando motorista')

                await atualizarPerfilMotorista({
                  nome,
                  email: email,
                  telefone,
                  data_nascimento: formatarData(dataNascimento)
                })


                console.log('10 - Motorista atualizado')

                setModoEdicao(false)

              } catch (error: any) {
                setMensagemErro(error.message)
              }
            }}
          />
        </View>
      )}

    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: colors.primary,
    overflow: "hidden",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  nome: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textGray,
    marginBottom: 20,
    textAlign: "center",
  },

  informacoesContainer: {
    width: "100%",
    marginBottom: 15,
  },

  info: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    color: colors.textGray,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#C9C9C9",
  },

  titulos: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textGray,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 10,
  },

  inputNome: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },

  botaoLogout: {
    marginTop: 20,
    alignItems: "center"
  }
})