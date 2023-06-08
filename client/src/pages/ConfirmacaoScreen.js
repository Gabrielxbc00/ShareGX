import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ConfirmacaoScreen = ({ navigation }) => {
  const handleVoltar = () => {
    navigation.navigate('Reserva');
  };

  return (
    <LinearGradient colors={['#090909', 'royalblue']} style={styles.container}>
      <Text style={styles.confirmacaoText}>Reserva confirmada!</Text>
      <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
        <Text style={styles.voltarButtonText}>Voltar para Reserva</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmacaoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  voltarButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  voltarButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ConfirmacaoScreen;
