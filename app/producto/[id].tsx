import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';  

const DetalleProducto = () => {
  const { id } = useLocalSearchParams();  
  const [producto, setProducto] = useState<any>(null);  
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const cargarDetalles = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);  
        if (!respuesta.ok) {
          throw new Error('No se pudieron obtener los detalles del producto');
        }
        const datos = await respuesta.json();
        setProducto(datos);  
        setCargando(false);
      } catch (error) {
        console.log('Error al cargar el producto:', error);
        setCargando(false);
      }
    };

    cargarDetalles();
  }, [id]); 

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el producto.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{producto.title}</Text>
      <Image source={{ uri: producto.image }} style={styles.image} />
      <Text style={styles.price}>${producto.price}</Text>
      <Text style={styles.description}>{producto.description}</Text>
      <Text>Categoria: {producto.category}</Text>
      <Text>Rating: {producto.rating?.rate} ({producto.rating?.count} opiniones)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  price: {
    fontSize: 20,
    color: 'green',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default DetalleProducto;
