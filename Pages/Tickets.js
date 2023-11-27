import { useEffect, useState } from "react";
import { View, Button, SafeAreaView, Text, Image, FlatList} from "react-native";
import { styles } from "./styles";

export default function Tickets(){
    const [products,setProducts] = useState([]);
    const [cliente,setClients] = useState([]);
    const [onlyClients, setOnlyClients] = useState([])

    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch(
                'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenertickets'
              );
            const data = await response.json();
            setProducts(data);
            const clientresponse = await fetch("https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerclientes")
            const clientdata = await clientresponse.json();
            setClients(clientdata);
            products.forEach(element => {
                let useClients = []
                cliente.forEach(client =>{
                    if(element.idcliente == client.id){
                        useClients.push(client);
                    }
                })
                setOnlyClients(useClients);
            });
        }

        fetchData();
    })

    const handleDeleteTicket= async (id)=>{
        const response = await fetch(
            `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=eliminarticket&id=${id}`
          );
          const data = await response.json();
          if (data.mensaje === 'ok') {
            alert('Producto eliminado con éxito');
          } else {
            alert('Hubo un error al eliminar el producto');
          }
        };

    const regresar = () =>{
        navigation.goBack()
    }

    const handleTicketClick = (item) =>{
        navigation.navigate('Ticket', {fecha:item.fecha,idcliente:item.idcliente,total:item.total,credito:item.credito,pagado:item.pagado,id:item.id})
    }

    return(
        <View style={styles.container}>
          <Button title="Regresar" onPress={regresar} color='skyblue' />
          <SafeAreaView style={styles.scroll}>
            <FlatList
            data={products}
            renderItem={({ item, index }) => (
              <View style={styles.listitem}>
                <Text onPress={() => handleTicketClick(item)}>
                  {item.fecha} - {onlyClients[index].nombre} -{' '}
                  {item.total} - {item.credito} - {item.pagado}
                </Text>
                <Image
                  source={{ uri: onlyClients[index].fotografia }}
                  style={{ width: 50, height: 50 , marginVertical:4}}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteTicket(item.id)}
                  color= 'pink'
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
          <Button
            title="Agregar Ticket"
            onPress={() => navigation.navigate('AgregarTicket')}
            style={styles.addButton}
            color='mediumseagreen'
          />
        </View>
    )   
}