import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Axios from "axios";
import { Feather } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';
import { LinearGradient } from 'expo-linear-gradient';

const mapImages = [
  require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/img1.1.png'),
  require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/img1.2.png'),
  require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/img1.3.png'),
  require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/img1.4.png'),
  require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/img1.5.png'),
  require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/img1.6.png'),
  require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/img1.7.png'),
];

const ReservaScreen = ({ navigation }) => {
  const [destino, setDestino] = useState('');
  const [passageiro, setPassageiro] = useState([]);
  const [novoPassageiro, setNovoPassageiro] = useState('');
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    try {
      const response = await Axios.get('http://192.168.0.139:3001/data');
      const dadosRecebidos = response.data;
      setPassageiro(dadosRecebidos);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const handleAddPassageiro = () => {
    const novoPassageiroData = {
      destino: destino,
      nome: novoPassageiro,
      id: uuidv4(),
    };
  
    setPassageiro([...passageiro, novoPassageiroData]);
  
    Axios.post('http://192.168.0.139:3001/data', novoPassageiroData)
      .then(() => {
        console.log('Dados enviados com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados:', error);
      });
  
    setDestino('');
    setNovoPassageiro('');
  };

  const handleReservaPassageiro = (passageiro) => {
    const randomIndex = Math.floor(Math.random() * mapImages.length);
    const selectedMapImage = mapImages[randomIndex];
    setReserva({ ...passageiro, mapImage: selectedMapImage });
  };

  const handleExcluirReserva = (item) => {
    const novaLista = passageiro.filter((passageiro) => passageiro.id !== item.id);
    setPassageiro(novaLista);
  
    Axios.delete(`http://192.168.0.139:3001/data/${item.id}`)
      .then(() => {
        console.log('Passageiro excluído com sucesso');
        buscarDados();
      })
      .catch((error) => {
        console.error('Erro ao excluir o passageiro:', error);
      });
  };
 
  const handleConfirmarReserva = () => {
    navigation.navigate('Confirmacao');
  };

  return (
    <LinearGradient colors={['#090909', 'royalblue']} style={styles.container}>
    <View style={styles.container}>
      
      <Text style={styles.title}>Compartilhamento de caronas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu destino"
          value={destino}
          onChangeText={setDestino}
        />
      </View>
      <View style={styles.passageiroContainer}>
        <View style={styles.passageiroInputContainer}>
          <TextInput
            style={styles.passageiroInput}
            placeholder="Digite o nome do passageiro"
            value={novoPassageiro}
            onChangeText={setNovoPassageiro}
          />
        </View>
        <TouchableOpacity style={styles.addBotao} onPress={handleAddPassageiro}>
          <Text style={styles.addBotaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={passageiro}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.passageiroContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: `https://i.pravatar.cc/300?u=${item.nome}` }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.passageiroInfo}>
              <Text style={styles.passageiro}>{item.nome}</Text>
              <Text style={styles.destino}>Destino: {item.destino}</Text>
            </View>
            <TouchableOpacity
              style={styles.reservaBotao}
              onPress={() => handleReservaPassageiro(item)}
            >
              <Text style={styles.reservaBotaoTexto}>Reservar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.excluirBotao}
              onPress={() => handleExcluirReserva(item)}
            >
              <Feather name="trash-2" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
      {reserva && (
        <View style={styles.reservaContainer}>
          <Text style={styles.reservaTitle}>Deseja confirmar a reserva?</Text>
          <Image source={reserva.mapImage} style={styles.mapImage} />
          <Text style={styles.reservaPassageiro}>{reserva.nome}</Text>
          <Text style={styles.reservaDestino}>{reserva.destino}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.confirmarReservaButton} onPress={handleConfirmarReserva}>
        <Text style={styles.confirmarReservaButtonText}>Confirmar Reserva</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#dcdcdc',
  },
  input: {
    flex: 1,
    height: 47,
  },
  passageiroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passageiroInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: '#dcdcdc',
  },
  passageiroInput: {
    flex: 1,
    height: 40,
  },
  addBotao: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addBotaoTexto: {
    color: 'white',
  },
  passageiroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#dcdcdc',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  passageiroInfo: {
    flex: 1,
    marginLeft: 10,
  },
  passageiro: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  destino: {
    fontSize: 14,
  },
  reservaBotao: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  reservaBotaoTexto: {
    color: 'white',
  },
  excluirBotao: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  reservaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#dcdcdc',
  },
  reservaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mapImage: {
    width: 200,
    height: 200,
    marginBottom: 5,
    width: '100%',
    resizeMode: 'cover',
    marginTop: 15,
  },
  reservaPassageiro: {
    fontSize: 16,
    marginBottom: 5,
  },
  reservaDestino: {
    fontSize: 14,
  },
  confirmarReservaButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmarReservaButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReservaScreen;