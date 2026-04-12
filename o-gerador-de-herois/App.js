import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useState, useEffect} from "react"
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as ImagePicker from 'expo-image-picker'
import * as Haptics from 'expo-haptics'
import { Accelerometer } from 'expo-sensors'

const Stack = createStackNavigator()

function HomeScreen({navigation}){
  const [imagem, setImagem] = useState(null)

  const selecionarImagem = async () => {
    // 1. Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos.");
      return;
    }
  
     // 2. Abre a galeria
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite cortar a foto
      aspect: [1, 1], // Força um quadrado
      quality: 1,
    });

    // 3. Se o usuário não cancelou, salva a URI da imagem no estado
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }
  const criarHeroi = async () => {
    if (!imagem) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      Alert.alert("Selecione uma foto primeiro!")
      return
    }
    navigation.navigate("Herói", { imagem })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Crie seu Herói </Text>

      <TouchableOpacity onPress={selecionarImagem} style={styles.imageContainer}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.imagemHeroi}/>
        ) : (
          <View style={styles.placeholder}>
            <MaterialCommunityIcons name="camera-plus" size={60} color="#CBD5E1" />
            <Text style={styles.placeholderText}>Toque para adicionar</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={criarHeroi} style={styles.botaoPrincipal}>
        <Text style={styles.textoBotaoPrincipal}>Criar Herói</Text>
      </TouchableOpacity>
    </View>
  )
}

function HeroScreen({route, navigation}){
  const {imagem} = route.params

  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const [forca, setForca] = useState(0)
  const [agilidade, setAgilidade] = useState(0)
  const [magia, setMagia] = useState(0)

   const _subscribe = () => {
    // Ativa o sensor e guarda a inscrição no estado
    const sub = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
    setSubscription(sub);
    Accelerometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    // Remove a inscrição se ela existir
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  const aceleracaoTotal = Math.abs(x) + Math.abs(y) + Math.abs(z);

   useEffect(() => {
    // Se chacoalhar forte (limiar 3.5), gera resposta
    if (aceleracaoTotal > 3.5) { 
      setForca(Math.floor(Math.random() * 100))
      setAgilidade(Math.floor(Math.random() * 100))
      setMagia(Math.floor(Math.random() * 100))
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
  }, [aceleracaoTotal]);
  
  return (
    <View style={styles.container}>
      <Text>Seu Herói</Text>

      <Image source={{ uri: imagem }} style={styles.imagemHeroiGrande}/>
      <Text style={styles.instrucao}>Chacoalhe o celular para sortear os atributos!</Text>

      <View style={styles.atributosContainer}>
        <Text style={styles.atributo}>💪 Força: {forca}</Text>
        <Text style={styles.atributo}>⚡ Agilidade: {agilidade}</Text>
        <Text style={styles.atributo}>✨ Magia: {magia}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoSecundario}>
        <Text style={styles.textoBotaoSecundario}>Deletar Herói</Text>
      </TouchableOpacity>
    </View>
  )
} 

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Criar Herói"}}/>
        <Stack.Screen name="Herói" component={HeroScreen} options={{title: "Seu Herói"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F1F5F9',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 30,
    textShadowColor: 'rgba(59, 130, 246, 0.8)', 
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 110,
    padding: 8,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#3B82F6',
    elevation: 15,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.5,
    shadowRadius: 20
  },
  imagemHeroi: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  imagemHeroiGrande: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#F59E0B',
    marginBottom: 20
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B'
  },
  placeholderText: {
    color: '#94A3B8',
    marginTop: 10,
    fontWeight: 'bold'
  },
  instrucao: {
    fontSize: 14,
    color: '#94A3B8',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 30
  },
  atributosContainer: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#F59E0B', 
    marginBottom: 30,
    elevation: 5
  },
  atributo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginVertical: 8,
    fontFamily: 'System'
  },
  botaoPrincipal: {
    backgroundColor: '#3B82F6',
    width: '100%',
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#1D4ED8'
  },
  textoBotaoPrincipal: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  botaoSecundario: {
    marginTop: 20,
    width: '100%',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    elevation: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  textoBotaoSecundario: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2
  }
});