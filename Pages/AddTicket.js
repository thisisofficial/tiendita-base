import { View, Button, TextInput, Text} from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function AddTicket({navigation}){
    const [idcliente, setIdCliente] = useState('')
    const [clientes,setClientes] = useState([])
    const [clientesId,setClientesId] = useState([])
    const [loading, setLoading] = useState(true);
    const today = new Date();
    useEffect(()=>
    {
        
        const fetchData = async() =>{
            let temp = [];
        await fetch(
            `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=obtenerclientes`
          ).then((response) => response.json()).then((responsejson) => {setClientes(responsejson)}).then((responsejson) => {clientes.forEach(element => { temp.push(element.id)})}).then((responsejson) => {console.log(temp);setClientesId(temp)})
          setLoading(false)
        }
        fetchData();

    },[loading])

    const handlesave = async() =>{
      const fechita = today.getFullYear() + '-'+today.getMonth() + '-'+today.getDay();
      console.log(fechita)
        const response = await fetch(
            `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=insertarticket&fecha=${fechita}&idcliente=${idcliente}&total=0&credito=0&pagado=0`
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
            <Text>Id disponibles: {clientesId.toString()}</Text>
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