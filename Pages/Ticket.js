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
    const [detalles, setDetalles] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
        const response = await fetch(
            'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerclientes'
          );
          const data = await response.json();
          setClient(data);
          let clienty;
        client.forEach(element => {
            if(element.id == ticket.idcliente){
                clienty = element;
            }
        })
        setClient(clienty);
        let temp = 0;
        const responsedetails = await fetch("https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerdetalleticket");
        const detailsdata = await responsedetails.json();
        setDetalles(detailsdata);
        let tempdetails = [];
        detalles.forEach(element => {
            if(element.idticket == ticket.id){
                tempdetails.push(element);
                temp = temp+element.precio
            }
        })
        setDetalles(tempdetails);
        setTotal(temp);
        setCredito(total-pagado);
        const productsdetails = await fetch("https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerproductos")
        const productdata = await productsdetails.json();
        setTempProducts(productdata);
        let tempprods = [];
        detalles.forEach(element => {
            tempProducts.forEach(element2 =>{
                if(element2.id == element.idproducto){
                    tempprods.push(element2);
                }
            })
        })
        setProducts(tempprods);

        

        }
        fetchData();
    })

    const handleCreditChange = (event) =>{
        setPagado(event.target.value);
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
    }

    const handleDetailClick = async (item) =>{
        navigation.navigate("DetailEdit", {id: item.id, idticket:item.idticket, idproducto:item.idproducto,nombre:item.nombre, cantidad:item.cantidad, precio:item.precio})
    }

    return(
        <View style={styles.listitem}>
                <Text onPress={() => handleTicketClick(item)}>
                  Fecha: {ticket.fecha} - Cliente: {client.nombre} -{' '}
                  Total:$ {total} - Pendiente:$ {credito}
                </Text>
                <TextInput value={pagado} onChange={handleCreditChange}></TextInput>
                <Image
                  source={{ uri: client.fotografia }}
                  style={{ width: 50, height: 50 , marginVertical:4}}
                />
                          <SafeAreaView style={styles.scroll}>
            <FlatList
            data={detalles}
            renderItem={({ item, index }) => (
              <View style={styles.listitem}>
                <Text onPress={() => handleDetailClick(item)}>
                  {products[index].nombre} - {item.cantidad} -{' '}
                  Concepto: {item.nombres} - {item.precio}
                </Text>
                <Image
                  source={{ uri: products[index].fotografia }}
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
                  onPress={() => navigation.navigate("AddTicketDetail",{id:ticket.id})}
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