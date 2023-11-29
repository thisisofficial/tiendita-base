import { useEffect, useState } from "react";
import { View, Button, SafeAreaView, Text, Image, FlatList} from "react-native";
import { styles } from "./styles";

export default function Clientes({navigation}){

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
            const response = await fetch(
                'https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=obtenerclientes'
              );
              const data = await response.json();
              setClients(data);
            }
            catch(error){
                console.error(error)
            }
            finally{
                setLoading(false)
            }
        }
        fetchData();
    },[loading])

    const handleDeleteClient = async (id) => {
        const response = await fetch(
          `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=eliminarcliente&id=${id}`
        );
        const data = await response.json();
        if (data.mensaje === 'ok') {
          alert('Cliente eliminado con éxito');
        } else {
          alert('Hubo un error al eliminar el cliente');
        }
        setLoading(true)
      };

      const handleClientClick = (item) =>{
        setLoading(true)
        navigation.navigate("ClientEdit", {nombre:item.nombre, domicilio:item.domicilio, correo:item.correo,telefono:item.telefono,periodocobrar:item.periodocobrar,diacobrar:item.diacobrar,fotografia:item.fotografia,idtienda:item.idtienda,id:item.id,horacobrar:item.horacobrar});
    }

    const regresar = () =>{
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
          <Button title="Regresar" onPress={regresar} color='skyblue'/>
          <SafeAreaView style={styles.scroll}>
          <FlatList
            data={clients}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <Text onPress={() => handleClientClick(item)}>
                  {item.nombre} - {item.domicilio} - {item.correo} -{' '}
                  {item.telefono} - {item.periodocobrar} - {item.diacobrar} -{' '}
                  {item.horacobrar}
                </Text>
                <Image
                  source={{ uri: item.fotografia }}
                  style={{ width: 50, height: 50 }}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteClient(item.id)}
                  color= 'lightpink'
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          </SafeAreaView>
          <Button
            title="Agregar cliente"
            onPress={() => {setLoading(true);navigation.navigate("AgregarClientes")}}
            style={styles.addButton}
            color = 'mediumseagreen'
          />
        </View>
      );
}