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
    
    const [detalles, setDetalles] = useState([]);
    const [oldDetalles, setOldDetalles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      const fetchDatai = async() =>{
            try{
              const response = await fetch(
                'https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=obtenerdetalleticket'
              );
              const data = await response.json();
              
              //alert(JSON.stringify(data))
              setOldDetalles(data);
              //alert(detalles)
             
            }catch(error){
              
            }
            finally{
              let temp = 0;
              let tempdetails = [];
              console.log(tempdetails);
              oldDetalles.forEach(element => {
                  if(element.idticket == ticket.id){
                      tempdetails.push(element);
                      console.log(tempdetails);
                      temp = temp+parseFloat(element.precio)
                      
                  }
              })
              setDetalles(tempdetails);
              console.log(detalles)

              setTotal(temp);
              setCredito(total-pagado);
              try{
                const productsdetails = await fetch("https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=obtenerproductos")
                const productdata = await productsdetails.json();
                setTempProducts(productdata);
              }catch(error){

              }finally{
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
                console.log(products)
                setLoading(false)
              }
            }
          
      }  
      fetchDatai()
      
    },[loading,pagado])


    

    const handleCreditChange = (text) =>{
        setPagado(text);
        setCredito(total-pagado);
    }


    const handleTicketChange = async () => {
        const response = await fetch(
            `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=editarticket&fecha=${ticket.fecha}&idcliente=${ticket.idcliente}&total=${total}&credito=${credito}&pagado=${pagado}&id=${ticket.id}`
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
            `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=eliminardetalleticket&id=${id}`
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
                  Fecha: {ticket.fecha} - Cliente: {ticket.client?ticket.client:"empty"} -{' '}
                  Total:$ {total} - Pendiente:$ {credito} - Pagado: $ {pagado}
                </Text>
                <TextInput
                style={styles.input}
                placeholder="Pagado"
                value={pagado}
                onChangeText={(text)=>handleCreditChange(text)}
                />
                <Image
                  source={{ uri: ticket.clientfoto?ticket.clientfoto:"empty" }}
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
                  title="Recargar detalles"
                  onPress={() => setLoading(true)}
                  color= 'khaki'
            />
          <Button
                  title="Agregar Detalle"
                  onPress={() => {setLoading(true);navigation.navigate("AddTicketDetail",{id:ticket.id})}}
                  color= 'mediumseagreen'
            />
            <Button
                  title="Guardar"
                  onPress={() => handleTicketChange()}
                  color= 'khaki'
            />
            <Button
                  title="Eliminar"
                  onPress={() => handleDeleteTicket(ticket.id)}
                  color= 'pink'
            />
        </View>
    )

}