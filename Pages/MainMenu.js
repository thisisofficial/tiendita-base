import { View, Button } from "react-native"
import { styles } from "./styles";

export default function MainMenu({navigation}){
    const handleClients = () =>{}
    const handleProducts = () =>{}
    return (
        <View style={styles.container}>
          <View style={styles.button}><Button title="Productos" onPress={() => {navigation.navigate("Productos")}} /></View>
          <View style={styles.button}><Button title="Clientes" onPress={() => navigation.navigate('Clientes')} /></View>
          <View style={styles.button}><Button title="Ventas" onPress={() => navigation.navigate('Tickets')} /></View>
          <View style={styles.button}><Button title="Report" onPress={() => navigation.navigate('Report')} /></View> 
        </View>
      );
}