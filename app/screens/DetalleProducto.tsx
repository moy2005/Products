import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'; 
import React, { useState } from 'react';
import Boton from '../components/Boton'; 
import { Link, useLocalSearchParams } from 'expo-router';

const DetalleProducto = () => {
  const { id } = useLocalSearchParams();
  
  type ProductoType = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };

  const [producto, setProducto] = useState<ProductoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!respuesta.ok) {
        console.log('Error de carga de datos');
        throw new Error(`Ocurrió un error: ${respuesta.status}`);
      }
      const datos = await respuesta.json();
      setProducto(datos);
      setLoading(false);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  const screenUnLoad = () => (
    <View style={styles.container}>
      <Boton titulo="Cargar datos" onPress={loadData} />
      <Text style={styles.textoCargando}>Cargando datos...</Text>
      <ActivityIndicator size="large" color="#6b7bff" />
    </View>
  );

  const screenLoad = () => (
    <View style={styles.container}>
      <Text style={styles.titulo}>Producto: {producto?.title}</Text>
      <Text style={styles.descripcion}>Descripción: {producto?.description}</Text>
      <Text style={styles.precio}>Precio: ${producto?.price}</Text>
      <Text style={styles.categoria}>Categoría: {producto?.category}</Text>
      <Link href="../index" style={styles.regresar}>Regresar</Link>
    </View>
  );

  return <View>{loading ? screenUnLoad() : screenLoad()}</View>;
};

export default DetalleProducto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo claro para toda la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B2E1E',
    marginBottom: 15,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  precio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50', // Verde para el precio
    marginBottom: 10,
  },
  categoria: {
    fontSize: 16,
    color: '#6b7bff', // Color atractivo para la categoría
    marginBottom: 20,
  },
  regresar: {
    fontSize: 16,
    color: '#6b7bff',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  textoCargando: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
  },
});
