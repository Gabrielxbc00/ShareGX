  import React, { useState, useEffect } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { Feather } from '@expo/vector-icons';
  import Axios from "axios";
  import LoginScreen from './src/pages/LoginScreen';
  import ReservaScreen from './src/pages/ReservaScreen';
  import ConfirmacaoScreen from './src/pages/ConfirmacaoScreen';

  const Tab = createBottomTabNavigator();

  export default function App() {
    const [dados, setDados] = useState([]);

    const submeterInformacao = (texto) => {
      Axios.post('http://192.168.0.139:3001/data', { data: texto })
        .then(() => {
          console.log('Dados enviados com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao enviar os dados:', error);
        });
    };

    const buscarDados = () => {
      Axios.get('http://192.168.0.139:3001/data')
        .then((response) => {
          const dadosRecebidos = response.data;
          console.log('Resposta do servidor:', dadosRecebidos);
          setDados(dadosRecebidos);
          console.log('Dados recebidos:', dadosRecebidos);
        })
        .catch((error) => {
          console.error('Erro ao buscar os dados:', error);
        });
    };

    const handleExcluirPassageiro = (key) => {
      Axios.delete(`http://192.168.0.139:3001/data/${key}`)
        .then(() => {
          console.log('Passageiro excluído com sucesso');
          buscarDados();
        })
        .catch((error) => {
          console.error('Erro ao excluir o passageiro:', error);
        });
    };

    useEffect(() => {
      buscarDados();
    }, []);

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Login") {
                iconName = "log-in";
              } else if (route.name === "Reserva") {
                iconName = "book";
              } else if (route.name === "Confirmacao") {
                iconName = "check-circle";
              }

              return <Feather name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "blue",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Reserva">
            {(props) => (
              <ReservaScreen
                {...props}
                submeterInformacao={submeterInformacao}
                buscarDados={buscarDados}
                dados={dados}
                handleExcluirPassageiro={handleExcluirPassageiro}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Confirmacao" component={ConfirmacaoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
