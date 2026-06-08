
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import Background from "../components/common/Background";
import { colors } from "../theme/colors";
import { usePerfil } from "../hooks/usePerfil"


export default function PerfilScreen() {

  const { form } = usePerfil()

  console.log(form)

  if (!form || !form.Motorista) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={
              form.Motorista.foto
                ? { uri: form.Motorista.foto }
                : require("../assets/avatar-placeholder.png")
            }
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.nome}>
          {form.Motorista.nome}
        </Text>

        <View style={styles.informacoesContainer}>
          <Text style={styles.info}>{form.Motorista.email}</Text>
          <Text style={styles.info}>{form.Motorista.telefone}</Text>
          <Text style={styles.info}>{form.Motorista.cpf}</Text>
          <Text style={styles.info}>{form.Motorista.dataNascimento}</Text>
          <Text style={styles.info}>{form.Motorista.cnh}</Text>
        </View>

        <Text style={styles.titulos}>
          Endereço
        </Text>

        <View style={styles.informacoesContainer}>
          <Text style={styles.info}>{form.Motorista.cep}</Text>
          <Text style={styles.info}>{form.Motorista.logradouro}</Text>
          <Text style={styles.info}>{form.Motorista.bairro}</Text>
          <Text style={styles.info}>
            {form.Motorista.uf} - {form.Motorista.cidade}
          </Text>
          <Text style={styles.info}>{form.Motorista.complemento}</Text>
          <Text style={styles.info}>
            Número {form.Motorista.numero}
          </Text>
        </View>

        <Text style={styles.titulos}>
          Dados Bancarios
        </Text>

        <View style={styles.informacoesContainer}>
          <Text style={styles.info}>{form.Motorista.banco}</Text>
          <Text style={styles.info}>{form.Motorista.tipo_conta}</Text>
          <Text style={styles.info}>{form.Motorista.agencia}</Text>
          <Text style={styles.info}>
            {form.Motorista.conta} - {form.Motorista.digito}
          </Text>
        </View>

        <Text style={styles.titulos}>
          Dados do Veiculo
        </Text>

        <View style={styles.informacoesContainer}>
          <Text style={styles.info}>{form.Motorista.modalidade}</Text>
          <Text style={styles.info}>{form.Motorista.cor}</Text>
          <Text style={styles.info}>{form.Motorista.marca}</Text>
          <Text style={styles.info}>{form.Motorista.modelo}</Text>
          <Text style={styles.info}>{form.Motorista.placa}</Text>
          <Text style={styles.info}>
            {form.Motorista.ano_modelo} - {form.Motorista.ano_fabricacao}
          </Text>
        </View>

      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 80,
    alignItems: "center",
  },

  avatarContainer: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 28,
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  nome: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.textGray,
    marginBottom: 40,
    textAlign: "center",
  },

  informacoesContainer: {
    width: "100%",
    marginBottom: 36,
  },

  info: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    color: colors.textGray,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C9C9C9",
    fontWeight: "500",
  },

  titulos: {
    fontSize: 34,
    fontWeight: "700",
    color: colors.textGray,
    marginBottom: 24,
  },
});