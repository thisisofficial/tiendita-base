import { View, Button, TextInput} from "react-native";
import { useState } from "react";
import { styles } from "./styles";

export default function AddTicket({navigation}){
    const [idcliente, setIdCliente] = useState('')

    return(
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

         </View>   
    )
}