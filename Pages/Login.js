import { TextInput, View, Button, Image } from 'react-native';
import {styles} from './styles'
import { useState } from 'react';
import unnamed from '../assets/unnamed.png'

export default function Login({navigation}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await fetch(
          `https://programacion-de-moviles.000webhostapp.com/5f/api2.php?comando=login&usuario=${username}&contrasena=${password}`
        );
        const data = await response.json();
        if (data.usuario) {
          alert('Iniciaste sesión correctamente');
          navigation.navigate('Main');
        } else {
          alert('Hubo un error al iniciar sesión');
        }
      };
    return(

        <View style={styles.container}>
            <Image src={"assets/unnamed.png"} style={{ width: 50, height: 50 , marginVertical:4}}/>
            <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Usuario"
            />
            <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Contraseña"
            secureTextEntry
            />
            <Button title="Iniciar sesión" onPress={handleLogin} color={'mediumseagreen'}/>
        </View>
)}