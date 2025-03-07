import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Boton from '../components/Boton';  
import { useRouter } from 'expo-router';

const FakeList = () => {
  const ruta = useRouter();

  type Producto = {
    id: number;
    title: string;
    price: number;
    description?: string;
    category?: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
  };

  const [Productos, setProductos] = useState<Producto[]>([]);
  const [Cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const CargaDatos = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
          throw new Error('Error al conectar con la fuente de datos');
        }
        const datos = await respuesta.json();
        console.log("Datos recibidos:", datos); 
        setProductos(datos);
        setCargando(false);
      } catch (error) {
        console.log('Error durante la obtención de datos', error);
      }
    };
    CargaDatos();
  }, []);
  

  const UnLoadScreen = () => (
    <View style={styles.loadscreen}>
      <Text style={styles.titulo}>Cargando Datos...</Text>
      <ActivityIndicator size="large" color="#6b7bff" />
    </View>
  );

  const LoadScreen = () => (
    <View style={styles.loadscreen}>
      <Text style={styles.titulo}>Lista de Productos</Text>
      <FlatList
        data={Productos}
        renderItem={({ item }) => (
          <ProductoItem title={item.title} price={item.price} image={item.image} id={item.id} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatlist}
      />
    </View>
  );

  const ProductoItem = (props: Producto) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: props.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{props.title}</Text>
        <Text style={styles.productPrice}>${props.price}</Text>
        
        <Boton
          titulo="Ver Detalles"
          onPress={() => {
            ruta.push(`/producto/${props.id}`);
          }}
        />
      </View>
    );
  };

  return <View style={styles.container}>{Cargando ? UnLoadScreen() : LoadScreen()}</View>;
};

export default FakeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2d',  // Fondo claro para toda la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',  // Asegura que la tarjeta no ocupe todo el ancho
  },
  flatlist: {
    width: '100%',
    paddingHorizontal: 10,
  },
  loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e2d',
    padding: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  productImage: {
    height: 120,
    width: 120,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7bff',
    textAlign: 'center',
    marginBottom: 10,
  },
});
