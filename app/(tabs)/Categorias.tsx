import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const Categorias = () => {
  const ruta = useRouter();  
  const [categorias, setCategorias] = useState<string[]>([]); 
  const [cargando, setCargando] = useState<boolean>(true); 

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
          throw new Error('Error al obtener los productos');
        }
        const productos = await respuesta.json();
        const categoriasUnicas = [...new Set(productos.map((producto: any) => producto.category))] as string[];
        setCategorias(categoriasUnicas);
        setCargando(false);
      } catch (error) {
        console.log('Error al obtener las categorías:', error);
        setCargando(false);
      }
    };

    obtenerCategorias();
  }, []);

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#6b7bff" />
        <Text style={styles.textoCargando}>Cargando categorías...</Text>
      </View>
    );
  }

  const verProductosDeCategoria = (categoria: string) => {
    ruta.push(`/detalle/${categoria}`); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categorías</Text>
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => verProductosDeCategoria(item)} style={styles.categoriaItem}>
            <Text style={styles.categoriaTexto}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',  
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333', 
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',  
    padding: 20,
  },
  textoCargando: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
  },
  categoriaItem: {
    padding: 15,
    backgroundColor: '#fff',  
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  categoriaTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7bff',  // Color atractivo para el texto
    textAlign: 'center',
  },
});

export default Categorias;
