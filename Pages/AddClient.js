import { View, Button, TextInput} from "react-native";
import { useState } from "react";
import { styles } from "./styles";

export default function AddCliente({navigation}){

    const [newClientName, setNewClientName] = useState('');
    const [newClientAddress, setNewClientAddress] = useState('');
    const [newClientEmail, setNewClientEmail] = useState('');
    const [newClientPhone, setNewClientPhone] = useState('');
    const [newClientBillingPeriod, setNewClientBillingPeriod] = useState('');
    const [newClientBillingDay, setNewClientBillingDay] = useState('');
    const [newClientBillingHour, setNewClientBillingHour] = useState('');
    const [newClientStoreId, setNewClientStoreId] = useState('');
    const [newClientPhotography, setNewClientPhotography] = useState('');

    const handleAddClient = async () => {
        const response = await fetch(
          `https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=insertarcliente&nombre=${newClientName}&domicilio=${newClientAddress}&fotografia=${newClientPhotography}&correo=${newClientEmail}&telefono=${newClientPhone}&periodocobrar=${newClientBillingPeriod}&diacobrar=${newClientBillingDay}&horacobrar=${newClientBillingHour}&idtienda=${newClientStoreId}`
        );
        const data = await response.json();
        if (data.mensaje === 'ok') {
          alert('Cliente agregado con éxito');
        } else {
          alert('Hubo un error al agregar el cliente');
        }
        navigation.goBack()
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
        onChangeText={(text) => setNewClientName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Domicilio"
        onChangeText={(text) => setNewClientAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={(text) => setNewClientEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        onChangeText={(text) => setNewClientPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fotografía (URL)"
        onChangeText={(text) => setNewClientPhotography(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Período de cobro"
        onChangeText={(text) => setNewClientBillingPeriod(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Día de cobro"
        onChangeText={(text) => setNewClientBillingDay(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de cobro"
        onChangeText={(text) => setNewClientBillingHour(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID de la tienda"
        onChangeText={(text) => setNewClientStoreId(text)}
      />
      <Button title="Agregar cliente" onPress={handleAddClient} color ='mediumseagreen'/>
    </View>
  );
}