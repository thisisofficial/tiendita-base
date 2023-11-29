import { View, Button, TextInput, Text, Image} from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";

export default function EditClient({navigation, route}){
    const product = route.params;
    const [newClientName, setNewClientName] = useState(product.nombre);
    const [newClientAddress, setNewClientAddress] = useState(product.domicilio);
    const [newClientEmail, setNewClientEmail] = useState(product.correo);
    const [newClientPhone, setNewClientPhone] = useState(product.telefono);
    const [newClientBillingPeriod, setNewClientBillingPeriod] = useState(product.periodocobrar);
    const [newClientBillingDay, setNewClientBillingDay] = useState(product.diacobrar);
    const [newClientBillingHour, setNewClientBillingHour] = useState(product.horacobrar);
    const [newClientStoreId, setNewClientStoreId] = useState(product.idtienda);
    const [newClientPhotography, setNewClientPhotography] = useState(product.fotografia);
    const id = product.id

    const handleSaveClientChanges = async () => {
        const response = await fetch(
          `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=editarcliente&nombre=${newClientName}&domicilio=${newClientAddress}&fotografia=${newClientPhotography}&correo=${newClientEmail}&telefono=${newClientPhone}&periodocobrar=${newClientBillingPeriod}&diacobrar=${newClientBillingDay}}&horacobrar=${newClientBillingHour}&idtienda=${newClientStoreId}&id=${id}`
        );
        const data = await response.json();
        if (data.mensaje === 'ok') {
          alert('Cliente editado con éxito');
        } else {
          alert('Hubo un error al editar el cliente');
        }
        navigation.goBack();
      };

    return(
        <View>
            <Button
            title="Regresar"
            onPress={() => navigation.goBack()}
            color='skyblue'
          />
                
                <Text>
                  {newClientName} - {newClientAddress} - {newClientEmail} -{' '}
                  {newClientPhone} - {newClientBillingPeriod} - {newClientBillingDay} -{' '}
                  {newClientBillingHour}
                </Text>
                <Image
                  source={{ uri: newClientPhotography }}
                  style={{ width: 50, height: 50 }}
                />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={newClientName}
        onChangeText={(text) => setNewClientName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Domicilio"
        value={newClientAddress}
        onChangeText={(text) => setNewClientAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={newClientEmail}
        onChangeText={(text) => setNewClientEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={newClientPhone}
        onChangeText={(text) => setNewClientPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fotografía (URL)"
        value={newClientPhotography}
        onChangeText={(text) => setNewClientPhotography(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Período de cobro"
        value={newClientBillingPeriod}
        onChangeText={(text) => setNewClientBillingPeriod(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Día de cobro"
        value={newClientBillingDay}
        onChangeText={(text) => setNewClientBillingDay(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de cobro"
        value={newClientBillingHour}
        onChangeText={(text) => setNewClientBillingHour(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID de la tienda"
        value={newClientStoreId}
        onChangeText={(text) => setNewClientStoreId(text)}
      />

                <Button title="Guardar cambios" onPress={handleSaveClientChanges} style={styles.button} color='mediumseagreen'/>
                <Button
                  title="Eliminar"
                  onPress={() => handleDeleteClient(id)}
                  color= 'lightpink'
                />
        </View>
    )
}