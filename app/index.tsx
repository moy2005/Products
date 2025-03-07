import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>
      <Text style={styles.descripcion}>Explora nuestra aplicación con una experiencia moderna y fluida.</Text>
      <TouchableOpacity style={styles.boton} onPress={() => router.push('/screens/Login')}>
        <Text style={styles.textoBoton}>Ir a Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 16,
    color: '#b0b0b0',
    textAlign: 'center',
    marginBottom: 30,
  },
  boton: {
    backgroundColor: '#ff6b6b', // Color atractivo
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
