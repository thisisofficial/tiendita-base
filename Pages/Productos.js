import { useEffect } from "react";
import { styles } from "./styles";

export default function Productos({navigation}){

    const [products, setProducts] = useState([]);

    useEffect(()=> {
        const fetchData = async () =>{
            const response = await fetch(
                'https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=obtenerproductos'
              );
            const data = await response.json();
            setProducts(data);
        }

        fetchData();
    },[])

    const regresar = () =>{
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
          <Button title="Regresar" onPress={regresar} color='skyblue' />
          <ScrollView style={styles.scroll}>
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
          </ScrollView>
          <Button
            title="Agregar producto"
            onPress={() => setShowAddProductForm(true)}
            style={styles.addButton}
            color='mediumseagreen'
          />
        </View>
      );
}