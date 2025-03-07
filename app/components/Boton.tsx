import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

type props={
    titulo:string,
    onPress:()=>void,
    variante?:'Primario'|'Secundario'|'Peligro',
    estilo?:StyleProp<ViewStyle>,
    disable?:boolean,
    icono?:React.ReactNode,
    posicionIcono?:'Izquierda'|'Derecha'
}

const Boton = (Props:props) => {
    const getVariante=()=>{
        switch(Props.variante){
            case 'Secundario':return styles.Secundario;
            case 'Peligro': return styles.Peligro;
            default: return styles.Primario
        }
    }
  return (
    <Pressable 
    style={[styles.boton,getVariante(),Props.estilo, Props.disable && styles.Desabilitado ]}
    onPress={Props.onPress}>
        {Props.icono && Props.posicionIcono !== 'Derecha' && Props.icono}
        <Text style={styles.Texto}>{Props.titulo}</Text>
        {Props.icono && Props.posicionIcono === 'Derecha' && Props.icono}
    </Pressable>
  )
}

export default Boton

const styles = StyleSheet.create({
    boton:{
        backgroundColor:'#4B2E1E',
        padding:10,
        margin:10,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'center'
    },Texto:{
        color:'white',
        fontWeight:'bold',
        alignSelf:'center'
    },
    Primario:{backgroundColor:'#4B2E1E'},
    Secundario:{backgroundColor:'#A67B5B'},
    Peligro:{backgroundColor:'red'},
    Desabilitado:{opacity:.6}
})