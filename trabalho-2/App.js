import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, View, TextInput, TouchableOpacity, StatusBar, FlatList, StyleSheet} from 'react-native'
import {useState} from 'react'



export default function App(){
  const [produto, setProduto] = useState('')
  const [quantidade, setQuantidade] = useState ('')
  const [produtos, setProdutos] = useState([])

  const adicionarProduto = () => {
    if (produto.trim().length ==  0) return
    const novoProduto = {
      id: Date.now().toString(),
      titulo: `${produto}  (${quantidade})`
    }

    setProdutos([...produtos, novoProduto])
    setProduto('')
    setQuantidade('')
  }

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.textoItem}>
       • {item.titulo} 
      </Text>
      <TouchableOpacity 
        onPress={() => removerProduto(item.id)}>
        <Text style={styles.botaoRemover}> 🗑️ </Text>
      </TouchableOpacity>
    </View>
  )

  const removerProduto = (id) => {
    setProdutos(
      produtos.filter( (item) => item.id !=id)
    )
  }

  return (
    <SafeAreaProvider style = {styles.container}>
      <StatusBar barStyle="dark-content"/>
        <Text style={styles.titulo}> 🛒 Lista de Compras </Text>
        <View style={styles.areaInput}>
          <TextInput
            style={styles.input}
            value={produto}
            onChangeText={setProduto}
            placeholder="Produto (ex: Feijão)"
          />
          <TextInput
            style={styles.input}
            value={quantidade}
            onChangeText={setQuantidade}
            placeholder="Qtd (ex: 2kg)"
          />
          <TouchableOpacity style={styles.botaoAdd} onPress={adicionarProduto}>
            <Text style={styles.textoBotaoAdd}> Adicionar à Lista </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8E1CF",
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#92400E",
    textAlign: "center",
  },

  areaInput: {
    backgroundColor: "#F5E6C8",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },

  input: {
    height: 50,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#F59E0B",
    marginBottom: 12,
  },

  botaoAdd: {
    height: 50,
    backgroundColor: "#D97706",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoAdd: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  item: {
     flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6C88F",
  },

  textoItem: {
    fontSize: 16,
    color: "#374151",
  },

  botaoRemover: {
    fontSize: 20,
  },
})