import { useEffect, useState } from "react";
import { View, Button, SafeAreaView, Text, Image, FlatList, TextInput} from "react-native";
import { styles } from "./styles";

export default function Ticket({navigation, route}){
    const ticket = route.params;

    const [pagado, setPagado] = useState(ticket.pagado);
    const [credito, setCredito] = useState(ticket.credito);
    const [total, setTotal] = useState(ticket.total);
    const [products, setProducts] = useState([]);
    const [tempProducts, setTempProducts] = useState([]);
    const [client, setClient] = useState([]);
    const [detalles, setDetalles] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        
        fetchData();
    },[loading, pagado])

    const fetchData = async()=>{
        try{
            if(!client){
        const response = await fetch(
            'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerclientes'
          );
          const data = await response.json();
          setClient(data);
          console.log(client)
          let clienty;
            console.log(1)
            client.forEach(element => {
            if(element.id == ticket.idcliente){
                clienty = element;
            }
        })
        setClient(clienty);
        console.log("cliente"+clienty)
    }

    }
    catch(error){
        console.log(error);
    }
    finally{
        loaddetail()
    }

        }

    const loaddetail = async() =>{
        try{
            let temp = 0;
            const responsedetails = await fetch("https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerdetalleticket");
            const detailsdata = await responsedetails.json();
            setDetalles(detailsdata);
            console.log("why?" +detailsdata);
            console.log("doublewhy"+ detalles)
            let tempdetails = [];
            console.log(tempdetails)
            detalles.forEach(element => {
                if(element.idticket == ticket.id){
                    tempdetails.push(element);
                    console.log(tempdetails)
                    temp = temp+element.precio
                }
            })
            setDetalles(tempdetails);
            console.log(detalles)
            setTotal(temp);
            setCredito(total-pagado);
            const productsdetails = await fetch("https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerproductos")
            const productdata = await productsdetails.json();
            setTempProducts(productdata);
            let tempprods = [];
            console.log(3)
            detalles.forEach(element => {
                console.log(4)
                tempProducts.forEach(element2 =>{
                    if(element2.id == element.idproducto){
                        tempprods.push(element2);
                    }
                })
            })
            setProducts(tempprods);
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }

    const handleCreditChange = (text) =>{
        setPagado(text);
        setCredito(total-pagado);
    }

    const handleTicketChange = async () => {
        const response = await fetch(
            `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=editarticket&fecha=${ticket.fecha}&idcliente=${ticket.idcliente}&total=${total}&credito=${credito}&pagado=${pagado}&id=${ticket.id}`
          );
          const data = await response.json();
          if (data.mensaje === 'ok') {
            alert('Ticket editado con éxito');
          } else {
            alert('Hubo un error al editar el producto');
          }
        navigation.goBack();
    }

    const handleDeleteDetail = async (id) =>{
        const response = await fetch(
            `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=eliminardetalleticket&id=${id}`
        )
        const data = await response.json();
        if (data.mensaje === 'ok') {
          alert('Detalle eliminado con éxito');
        } else {
          alert('Hubo un error al editar el producto');
        }
        setLoading(true)
    }

    const handleDetailClick = async (item) =>{
        setLoading(true)
        navigation.navigate("DetailEdit", {id: item.id, idticket:item.idticket, idproducto:item.idproducto,nombre:item.nombre, cantidad:item.cantidad, precio:item.precio})
    }
    return(
        <View style={styles.listitem}>
                <Text>
                  Fecha: {ticket.fecha} - Cliente: {client?client.nombre:"empty"} -{' '}
                  Total:$ {total} - Pendiente:$ {credito} - Pagado: $ {pagado}
                </Text>
                <TextInput
                style={styles.input}
                placeholder="Pagado"
                value={pagado}
                onChangeText={(text)=>handleCreditChange(text)}
                />
                <Image
                  source={{ uri: client?client.fotografia:"empty" }}
                  style={{ width: 50, height: 50 , marginVertical:4}}
                />
                          <SafeAreaView style={styles.scroll}>
            <FlatList
            data={detalles}
            renderItem={({ item, index }) => (
              <View style={styles.listitem}>
                <Text onPress={() => handleDetailClick(item)}>
                  {products[index]?products[index].nombre:"empty"} - {item.cantidad} -{' '}
                  Concepto: {item.nombres} - {item.precio}
                </Text>
                <Image
                  source={{ uri: products[index]?products[index].fotografia:"empty" }}
                  style={{ width: 50, height: 50 , marginVertical:4}}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteDetail(item.id)}
                  color= 'pink'
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
          <Button
                  title="Agregar Detalle"
                  onPress={() => {setLoading(true);navigation.navigate("AddTicketDetail",{id:ticket.id})}}
                  color= 'mediumseagreen'
            />
            <Button
                  title="Guardar"
                  onPress={() => handleTicketChange()}
                  color= 'mediumseagreen'
            />
            <Button
                  title="Eliminar"
                  onPress={() => handleDeleteTicket(ticket.id)}
                  color= 'pink'
            />
        </View>
    )

}