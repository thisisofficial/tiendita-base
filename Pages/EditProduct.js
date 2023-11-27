import { View, Button, TextInput, Text, Image} from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function EditProduct({navigation, route}){
    


    const product = route.params;
    const [newProductName, setNewProductName] = useState(product.nombre);
    const [newProductDescription, setNewProductDescription] = useState(product.descripcion);
    const [newProductQuantity, setNewProductQuantity] = useState(product.cantidad);
    const [newProductCostPrice, setNewProductCostPrice] = useState(product.preciodecosto);
    const [newProductSalePrice, setNewProductSalePrice] = useState(product.preciodeventa);
    const [newProductPhotography, setNewProductPhotography] = useState(product.fotografia);
    const [newProductStoreId, setNewProductStoreId] = useState(product.idtienda);
    const id = product.id
    const handleSaveProduct = async () => {
    const response = await fetch(
        `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=editarproducto&nombre=${newProductName}&descripcion=${newProductDescription}&cantidad=${newProductQuantity}&preciodecosto=${newProductCostPrice}&preciodeventa=${newProductSalePrice}&fotografia=${newProductPhotography}&idtienda=${newProductStoreId}&id=${id}`
      );
      const data = await response.json();
      if (data.mensaje === 'ok') {
        alert('Producto editado con éxito');
      } else {
        alert('Hubo un error al editar el producto');
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
          <Text>
            {newProductName} - {newProductDescription} -{' '}
            {newProductQuantity} - {newProductCostPrice} -{' '}
            {newProductSalePrice}
          </Text>
          <Image
            source={{ uri: newProductPhotography }}
            style={{ width: 50, height: 50 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={newProductName}
            onChangeText={(text) => setNewProductName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={newProductDescription}
            onChangeText={(text) => setNewProductDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            value={newProductQuantity}
            onChangeText={(text) => setNewProductQuantity(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio de costo"
            value={newProductCostPrice}
            onChangeText={(text) => setNewProductCostPrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio de venta"
            value={newProductSalePrice}
            onChangeText={(text) => setNewProductSalePrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fotografía (URL)"
            value={newProductPhotography}
            onChangeText={(text) => setNewProductPhotography(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ID de la tienda"
            value={newProductStoreId}
            onChangeText={(text) => setNewProductStoreId(text)}
          />

          <Button title="Guardar cambios" onPress={handleSaveProduct} style={styles.button} color='mediumseagreen'/>
          <Button
            title="Eliminar"
            onPress={() => handleDeleteProduct(selectedProduct.id)}
            style={styles.button}
            color = 'salmon'
          />
        </View>
      );
}