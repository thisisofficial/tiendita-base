import { TextInput, View, Button, Image } from 'react-native';
import {styles} from './styles'
import { useState } from 'react';
import unnamed from '../assets/unnamed.png'

export default function Login({navigation}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try{
        const response = await fetch(
          `https://programaciondemovilesdos.000webhostapp.com/5f/api.php?comando=login&usuario=${username}&contrasena=${password}`
        );
        console.log(response);
        const data = await response.json();
        if (data.usuario) {
          alert('Iniciaste sesión correctamente');
          navigation.navigate('Main');
        } else {
          alert('Hubo un error al iniciar sesión');
        }
      }catch(error){
        console.error(error);
      }};
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