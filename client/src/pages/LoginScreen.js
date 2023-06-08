import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Reserva');
  };

  return (
    <LinearGradient colors={['#090909', 'royalblue']} style={styles.container}>
      <Image
        source={require('C:/Users/Ximen/OneDrive/Documentos/desenvolvimento-dispositivos-moveis/projetoAV2/client/pictures/Logo2.1.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#777" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Nome de usuário" />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#777" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#dcdcdc',
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: 280,
    height: 280,
    marginBottom: 20,
  },
});

export default LoginScreen;
