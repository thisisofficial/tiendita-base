import { useEffect, useState } from "react";
import { View, Button, SafeAreaView, Text, Image, FlatList} from "react-native";
import { styles } from "./styles";

export default function Tickets({navigation}){
    const [products,setProducts] = useState([]);
    const [cliente,setClients] = useState([]);
    const [onlyClients, setOnlyClients] = useState([{nombre:"any",fotografia:'any'}])
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
            const clientresponse = await fetch("https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerclientes")
            const clientdata = await clientresponse.json();
            setClients(clientdata);
            const response = await fetch(
                'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenertickets'
              );
            const data = await response.json();
            setProducts(data);
            let useClients = []
            products.forEach(element => {
                cliente.forEach(client =>{
                    if(element.idcliente == client.id){
                        useClients.push(client);
                    }
                })
            });
            setOnlyClients(useClients);
        }
        catch(error){
            console.error(error)
        }
        finally{
            console.log("Hello, check this shit!")
            setLoading(false);
        }
    }
        fetchData();
        
    },[loading])

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
          setLoading(true)
        };

    const regresar = () =>{
        navigation.goBack()
    }

    const handleTicketClick = (item,index) =>{
        navigation.navigate('Ticket', {fecha:item.fecha,idcliente:item.idcliente,total:item.total,credito:item.credito,pagado:item.pagado,id:item.id,client:onlyClients[index].nombre,clientfoto:onlyClients[index].fotografia})
    }

    return(
        <View style={styles.container}>
          <Button title="Regresar" onPress={regresar} color='skyblue' />
          <SafeAreaView style={styles.scroll}>
            <FlatList
            data={products}
            renderItem={({ item, index }) => (
              <View style={styles.listitem}>
                <Text onPress={() => handleTicketClick(item,index)}>
                  {item.fecha} - {onlyClients[index]?onlyClients[index].nombre:"empty"} -{' '}
                  {item.total} - {item.credito} - {item.pagado}
                </Text>
                <Image
                  source={{ uri: onlyClients[index]?onlyClients[index].fotografia:"empty" }}
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
            onPress={() => {navigation.navigate('AddTicket'); setLoading(true)}}
            style={styles.addButton}
            color='mediumseagreen'
          />
        </View>
    )   
}