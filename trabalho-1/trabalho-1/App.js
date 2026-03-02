import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {useState} from 'react'

export default function App(){
    const [valorConta, setvalorConta] = useState("")
    const [mensagemResultado, setmensagemResultado] = useState("")

    const calcularGorjeta = () => {
        const valor = parseFloat(valorConta)
        const gorjeta = valor * 0.1
        setmensagemResultado(`O valor da gorjeta é: R$ ${gorjeta.toFixed(2)}`)
    }

    const limpar = () => {
        setvalorConta("")
        setmensagemResultado("")
    }
    return (
      <SafeAreaProvider style={styles.container}>
          <Text style={styles.titulo}> Calculadora de Gorjeta </Text>
          <Text style={styles.subtitulo}> Digite o valor da conta e clique em "CalcularGorjeta" </Text>
          <View style={styles.card}>
                <Text> Valor total da conta (R$) </Text>
                <TextInput style={styles.input} placeholder="Ex: 120.50"
                  value={valorConta} onChangeText={setvalorConta}/>
                <TouchableOpacity style={styles.botao} onPress={calcularGorjeta}>
                    <Text style={styles.textoBotao}> Calcular Gorjeta </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={limpar}>
                    <Text style={styles.textoBotao}> Limpar </Text>
                </TouchableOpacity>
                <View>
                    <Text> 
                        {mensagemResultado || "O resultado aparecerá aqui"}
                    </Text>
                </View>
          </View>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        padding: 24
    },
    titulo: {
        fontSize: 26, 
        textAlign: "center"
    },
    subtitulo: {
        fontSize: 14,
        textAlign: "center"
    },
    card: {
        backgroundColor: "#AABBFF",
        borderRadius: 12,
        padding: 16,
        margin: 10
    },
    input: {
        heigth: 30,
        borderRadius: 10,
        backgroundColor: "#fff",
        margin: 5
    },
    botao: {
        justifyContent: "center", alignItems: "center",
        heigth: 48,
        borderRadius: 10,
        backgroundColor: "#003366",
        margin: 10,
        padding: 5
    },
    textoBotao: {
        color: "#fff"
    }

})