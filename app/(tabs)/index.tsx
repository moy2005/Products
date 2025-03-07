import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>

      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.boton} onPress={() => router.push('/screens/Login')}>
          <Text style={styles.textoBoton}>Ir a Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, styles.botonSecundario]} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.textoBoton}>Ir a las pestañas</Text>
        </TouchableOpacity>
      </View>
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
  botonesContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 50, 
  },
  boton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: '#6b7bff',
    shadowColor: '#6b7bff',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
