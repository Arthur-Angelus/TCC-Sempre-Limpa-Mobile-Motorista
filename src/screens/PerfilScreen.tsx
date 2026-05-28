
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
                source={require("../assets/avatar-placeholder.png")}
                style={styles.avatar}
              />
            </View>
    
            <Text style={styles.nome}>
              {form.Motorista.nome}
            </Text>
    
            <View style={styles.informacoesContainer}>
              <Text style={styles.info}>{form.Motorista.email}</Text>
              <Text style={styles.info}>{form.Motorista.telefone}</Text>
              <Text style={styles.info}>{form. Motorista.cpf}</Text>
              <Text style={styles.info}>{form.Motorista.dataNascimento}</Text>
              <Text style={styles.info}>{form.Motorista.cnh}</Text>
            </View>
    
            <Text style={styles.tituloEndereco}>
              Endereço
            </Text>
    
            <View style={styles.informacoesContainer}>
              <Text style={styles.info}>{form.Motorista.cep}</Text>
              <Text style={styles.info}>{form.Motorista.rua}</Text>
              <Text style={styles.info}>{form.Motorista.bairro}</Text>
              <Text style={styles.info}>
                {form.Motorista.estado} - {form.Motorista.cidade}
              </Text>
              <Text style={styles.info}>{form.Motorista.complemento}</Text>
              <Text style={styles.info}>
                Número {form.Motorista.numero}
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
        resizeMode: "cover",
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
    
      tituloEndereco: {
        fontSize: 34,
        fontWeight: "700",
        color: colors.textGray,
        marginBottom: 24,
      },
    });