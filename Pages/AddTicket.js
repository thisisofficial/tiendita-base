import { View, Button, TextInput, Text} from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function AddTicket({navigation}){
    const [idcliente, setIdCliente] = useState('')
    const [clientes,setClientes] = useState([])
    const today = new Date();
    useEffect(()=>
    {
        
        const fetchData = async() =>{
            let temp = [];
        await fetch(
            `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerclientes`
          ).then((response) => response.json()).then((responsejson) => setClientes(responsejson)).then((responsejson) => clientes.forEach(element => { temp.push(element.id)})).then((responsejson) => setClientes(temp))
          
        }
        fetchData();

    },[])

    const handlesave = async() =>{
        const response = await fetch(
            `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=insertarticket&fecha=${today.getFullYear}-${today.getMonth}-${today.getDay}&idcliente=${idcliente}&total=0&credito=0&pagado=0`
          );
          const data = await response.json();
          if (data.mensaje === 'ok') {
            alert('Ticket agregado con éxito');
          } else {
            alert('Hubo un error al agregar el cliente');
          }  
          navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <Button
          title="Regresar"
          onPress={() => navigation.goBack()}
          color='skyblue'
            />
            <Text>Id disponibles: {clientes.toString()}</Text>
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setIdCliente(text)}
            />
            <Button
          title="Guardar"
          onPress={handlesave}
          color='mediumseagreen'
            />
         </View>   
    )
}