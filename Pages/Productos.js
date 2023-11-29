import { useEffect, useState } from "react";
import { View, Button, SafeAreaView, Text, Image, FlatList} from "react-native";
import { styles } from "./styles";

export default function Productos({navigation}){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchData = async () =>{
            try{
            const response = await fetch(
                'https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=obtenerproductos'
              );
            const data = await response.json();
            setProducts(data);
            }
            catch(error){
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [loading])  

    const handleDeleteProduct = async (id) => {

        const response = await fetch(
          `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=eliminarproducto&id=${id}`
        );
        const data = await response.json();
        if (data.mensaje === 'ok') {
          alert('Producto eliminado con éxito');
        } else {
          alert('Hubo un error al eliminar el producto');
        }
        setLoading(true);
      };

    const regresar = () =>{
        navigation.goBack()
    }

    const handleProductClick = (item) =>{
        setLoading(true);
        navigation.navigate("ProductEdit", {nombre:item.nombre, descripcion:item.descripcion, cantidad:item.cantidad,preciodecosto:item.preciodecosto,preciodeventa:item.preciodeventa,fotografia:item.fotografia,idtienda:item.idtienda,id:item.id});
        
    }

    return (
        <View style={styles.container}>
          <Button title="Regresar" onPress={regresar} color='skyblue' />
          <SafeAreaView style={styles.scroll}>
            <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <Text onPress={() => handleProductClick(item)}>
                  {item.nombre} - {item.descripcion} - {item.cantidad} -{' '}
                  {item.preciodecosto} - {item.preciodeventa}
                </Text>
                <Image
                  source={{ uri: item.fotografia }}
                  style={{ width: 50, height: 50 , marginVertical:4}}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteProduct(item.id)}
                  color= 'pink'
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
          <Button
            title="Agregar producto"
            onPress={() => {navigation.navigate('AgregarProd');setLoading(true);}}
            style={styles.addButton}
            color='mediumseagreen'
          />
        </View>
      );
}