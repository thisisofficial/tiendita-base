import { View, Button, TextInput, Text, Image, ActivityIndicator} from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function AddTicketDetail({navigation, route}){
    const {id} = route.params;
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [productsid, setProductsId] = useState([])
    const [productid, setProductId] = useState(null);
    const [prod, setProd] = useState();
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(1);
    const [concepto, setConepto] = useState("");

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await fetch(
                    'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerproductos'
                  );
                const data = await response.json();
                setProducts(data);
                let temp = []
                products.forEach(element=>{
                    temp.push(element.id)
                })
                setProductsId(temp)
                if(productid){
                    products.forEach(element => {
                        if(element.id == productid){
                            setProd(element)
                            setPrice(element.preciodeventa*quantity)
                        }
                    })
                }
            }
            catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchData()
    }, [loading, quantity, productid])

    const handleSaveDetail = async() =>{
        const response = await fetch(
            `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=insertardetalleticket&idticket=${id}&idproducto=${productid}&nombre=${concepto}&cantidad=${quantity}&precio=${price}`
          );
          const data = await response.json();
          if (data.mensaje === 'ok') {
            alert('Producto agregado con éxito');
          } else {
            alert('Hubo un error al agregar el producto');
        }
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
        {loading ? (<ActivityIndicator />):(
        
            <>
            
            <Button
                    title="Regresar"
                    onPress={() => navigation.goBack()}
                    color='skyblue' />
            <Text>Productos disponibles(por id): {productsid.toString()}</Text>
            <TextInput
                        style={styles.input}
                        placeholder="Id del producto"
                        onChangeText={(text) => setProductId(text)} />
            <Button
                    title="Cargar"
                    onPress={() => setLoading(true)}
                    color='khaki' />
            <TextInput
                        style={styles.input}
                        placeholder="Concepto"
                        onChangeText={(text) => setConepto(text)} />

            {prod?(
                              <View style={styles.listitem}>
                              <Text onPress={() => handleProductClick(item)}>
                                {prod.nombre} - {prod.descripcion}-{' '}
                                {prod.preciodeventa}
                              </Text>
                              <Image
                                source={{ uri: prod.fotografia }}
                                style={{ width: 50, height: 50 , marginVertical:4}}
                              />
                              <Text>Cantidad:</Text>
                              <TextInput
                                style={styles.input}
                                placeholder="Cantidad"
                                value={quantity}
                                onChangeText={(text) => setQuantity(text)} />
                              <Text>Precio final: {price}</Text>
                              </View>
            ):(<></>)}
            <Button
                    title="Guardar"
                    onPress={handleSaveDetail}
                    color='mediumseagreen' />
            </>
         
    )}
    </View> 
    )
}