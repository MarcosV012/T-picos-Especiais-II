import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useState, useEffect} from "react"
import {Text, View, StyleSheet, ActivityIndicator, FlatList} from "react-native"


export default function App (){
  const [carregando, setCarregando] = useState(true)
  const [cotacoes, setCotacoes] = useState([])


  useEffect ( () => {
    carregarCotacoes()
  }, [])

  const carregarCotacoes = async () => {
    try {
      // 1. faz a requisição
      const resposta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
      // 2. converte a resposta para JSON
      const dados = await resposta.json()
      // 3. salva na variável de estado
      setCotacoes(Object.values(dados))
    }
    catch(erro){
      console.error("Erro ao carregar", erro)
      alert("Não foi possível carregar os dados")
    }
    finally {
      // 4. desativa o icone de carregamento
      setCarregando(false)
    }
  } 

  const formatarMoeda = (valor) => {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.nomeMoeda}> {item.name} </Text>
      <Text style={styles.codigo}> {item.code} / {item.codein} </Text>
      <Text style={parseFloat(item.pctChange || 0) >= 0
            ? styles.valorAlta : styles.valorBaixa}> 
            {formatarMoeda(item.bid)} 
      </Text>
      <Text style={parseFloat(item.pctChange || 0) >= 0
            ? styles.variacaoAlta : styles.variacaoBaixa}> 
            {parseFloat(item.pctChange || 0) >= 0 ? '▲' : '▼'} {item.pctChange}% 
      </Text>
    </View>
  )

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.titulo}> Cotações em Tempo Real </Text>
      { /* Exibe o icone de carregamento enquanto busca os dados */
        carregando  ? (
          <View>
            <ActivityIndicator size="large" color="#6366F1"/>
            <Text> Buscando cotações ... </Text>
          </View>
        ) : (
          <FlatList
            data={cotacoes}
            keyExtractor={ (item) => item.code}
            renderItem={renderItem}/>
        )
      }
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 24,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  nomeMoeda: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  codigo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
    valorAlta: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#28a745',    
  },
  valorBaixa: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#dc3545',     
  },

  variacaoAlta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
  },
  variacaoBaixa: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
  },
})
