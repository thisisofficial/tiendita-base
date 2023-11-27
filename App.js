import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import MainMenu from './Pages/MainMenu';
import Productos from './Pages/Productos';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import Clientes from './Pages/Clientes';
import AddCliente from './Pages/AddClient';
import EditClient from './Pages/EditClient';
import Tickets from './Pages/Tickets';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Main" component={MainMenu}/>
        <Stack.Screen name="Productos" component={Productos}/>
        <Stack.Screen name="AgregarProd" component={AddProduct}/>
        <Stack.Screen name="ProductEdit" component={EditProduct}/>
        <Stack.Screen name="Clientes" component={Clientes}/>
        <Stack.Screen name="AgregarClientes" component={AddCliente}/>
        <Stack.Screen name="ClientEdit" component={EditClient}/>
        <Stack.Screen name='Tickets' component={Tickets}/>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
