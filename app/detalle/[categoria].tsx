import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ProductosCategoria = () => {
  const { categoria } = useLocalSearchParams();  
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState<boolean>(true); 
  const router = useRouter(); 

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
          throw new Error('Error al obtener los productos');
        }
        const productosDatos = await respuesta.json();
        const productosPorCategoria = productosDatos.filter(
          (producto: any) => producto.category === categoria
        );
        setProductos(productosPorCategoria);
        setCargando(false);
      } catch (error) {
        console.log('Error al obtener los productos de la categoría:', error);
        setCargando(false);
      }
    };

    cargarProductos();
  }, [categoria]); 

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Productos de {categoria}</Text>
      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.title}</Text>
            <Text style={styles.precio}>${item.price}</Text>
            {/* Botón Ver Más */}
            <TouchableOpacity
              style={styles.boton}
              onPress={() => router.push(`/producto/${item.id}`)}
            >
              <Text style={styles.textoBoton}>Ver Más</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  imagen: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  precio: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductosCategoria;
