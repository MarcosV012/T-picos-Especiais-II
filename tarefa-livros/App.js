import AsyncStorage from "@react-native-async-storage/async-storage"
import {Text, View, StatusBar, TouchableOpacity, TextInput, StyleSheet, FlatList} from "react-native"
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useState, useEffect} from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"
const STORAGEY_KEY = "@meus_livros"

export default function App(){
  const [livro, setLivro] = useState("")
  const [autor, setAutor] = useState("")
  const [livros, setLivros] = useState([])
  

  useEffect (() => {
    (async () => {
      try {
        const salvo = await AsyncStorage.getItem(STORAGEY_KEY)
        if (salvo){
          setLivros(JSON.parse(salvo))
        }
      }
      catch (e) {
        alert.alert("Erro", "Não foi possível carregar os dados")
      }
    })()
  }, [])

  useEffect (() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGEY_KEY, JSON.stringify(livros))
      }
      catch (e) {
        alert.alert("Erro", "Não foi possível salvar os livros")
      }
    }) ()
  }, [livros])

  const adicionarLivro = () => {
    if (!livro.trim() || !autor.trim()) {
      alert.alert("Atenção", "Por favor, preencha o título e o autor.");
      return;
    }
    const novoLivro = {
      id: Date.now().toString(),
      titulo: livro,
      autor: autor,
      status: "lendo"
    }

    setLivros([...livros, novoLivro])
    setLivro("")
    setAutor("")
  }

  const removerLivro = (id) => {
    setLivros( (prev) => prev.filter( (t) => t.id !=id))
  }

  const alternarStatus = (id) => {
  setLivros(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, status: item.status === "lendo" ? "lido" : "lendo" }
        : item
      )
    )
  } 

 const renderItem = ({ item }) => (
   <View style={[
      styles.itemLista, 
      item.status === "lido" ? styles.cardLido : styles.cardLendo
    ]}>
      <TouchableOpacity 
        style={styles.areaToque} 
        onPress={() => alternarStatus(item.id)}
      >
        <MaterialCommunityIcons
          name={item.status === "lido" ? "check-decagram" : "book-open-variant"}
          size={24}
          color={item.status === "lido" ? "#2E7D32" : "#1565C0"}
        />

        <View style={styles.conteudoItem}>
          <Text style={styles.textoTitulo}>{item.titulo}</Text>
          <Text style={styles.textoAutor}>{item.autor}</Text>
          <Text style={styles.badgeStatus}>
            {item.status === "lido" ? "Concluído" : "Lendo agora"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => removerLivro(item.id)} style={styles.botaoRemover}>
        <MaterialCommunityIcons name="trash-can-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </View>
)

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content"/>
        <View style={styles.header}>
          <MaterialCommunityIcons name="book-open-page-variant-outline" size={32} color="#FF0000"/>
          <Text style={styles.titulo}> Minha Estante </Text>
        </View>
        <View style={styles.entrada}>
          <TextInput style={styles.caixaEntrada} placeholder="Título do livro" value={livro} onChangeText={setLivro}/>
          <TextInput style={styles.caixaEntrada} placeholder="Nome do autor" value={autor} onChangeText={setAutor}/>
          <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarLivro}>
            <MaterialCommunityIcons name="file-plus" size={28} color="#ff4d4d"/>
            <Text style={styles.textoBotao}>Adicionar à lista</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={livros}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
           ListEmptyComponent={
          <Text style={styles.textoVazio}>Sua estante está vazia. Adicione livros!</Text>
        }/>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 30
  },
  titulo:{
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#1E293B"
  },
  entrada: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },
  caixaEntrada: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16
  },
  botaoAdicionar: {
    backgroundColor: "#ffc5b5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 8
  },
  textoBotao: {
    color: "#696969",
    fontWeight: "bold",
    fontSize: 16
  },
  itemLista: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 6
  },
  cardLido: {
    backgroundColor: "#E8F5E9",
    borderLeftColor: "#4CAF50"
  },
  cardLendo: {
    backgroundColor: "#E3F2FD",
    borderLeftColor: "#2196F3"
  },
  areaToque: {
     flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  conteudoItem: {
    marginLeft: 15,
    flex: 1
  },
  textoTitulo: {
     fontSize: 18,
    fontWeight: "bold",
    color: "#334155"
  },
  textoAutor: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4
  },
  botaoRemover: {
    padding: 10
  },
  badgeStatus: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase"
  },
  textoVazio: {
    textAlign: "center",
    marginTop: 50,
    color: "#94A3B8",
    fontSize: 16
  }

});