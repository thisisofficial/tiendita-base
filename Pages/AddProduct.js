import { View, Button, TextInput} from "react-native";
import { useState } from "react";
import { styles } from "./styles";

export default function AddProduct({navigation}){
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [newProductCostPrice, setNewProductCostPrice] = useState('');
    const [newProductSalePrice, setNewProductSalePrice] = useState('');
    const [newProductPhotography, setNewProductPhotography] = useState('');
    const [newProductStoreId, setNewProductStoreId] = useState('');

const handleAddProduct = async () => {
    const response = await fetch(
        `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=insertarproducto&nombre=${newProductName}&descripcion=${newProductDescription}&cantidad=${newProductQuantity}&preciodecosto=${newProductCostPrice}&preciodeventa=${newProductSalePrice}&fotografia=${newProductPhotography}&idtienda=${newProductStoreId}`
      );
      const data = await response.json();
      if (data.mensaje === 'ok') {
        alert('Producto agregado con éxito');
      } else {
        alert('Hubo un error al agregar el producto');
    }
    navigation.goBack();
  };
    return (
        <View style={styles.container}>
          <Button
            title="Regresar"
            onPress={() => navigation.goBack()}
            color='skyblue'
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => setNewProductName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            onChangeText={(text) => setNewProductDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            onChangeText={(text) => setNewProductQuantity(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio de costo"
            onChangeText={(text) => setNewProductCostPrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio de venta"
            onChangeText={(text) => setNewProductSalePrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fotografía (URL)"
            onChangeText={(text) => setNewProductPhotography(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ID de la tienda"
            onChangeText={(text) => setNewProductStoreId(text)}
          />

          <Button title="Agregar producto" onPress={handleAddProduct} color='mediumseagreen'/>
        </View>
      );
}