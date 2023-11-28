import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, TextInput, View } from 'react-native';


export default function Reporting() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [data, setData] = useState(null);

  const getReporte = async () => {
    try {
      let response = await fetch(`https://programacion-de-moviles.000webhostapp.com/5f/api.php?comando=reporteventas&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      let json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setFechaInicio}
        value={fechaInicio}
        placeholder="Fecha inicio"
      />
      <TextInput
        style={styles.input}
        onChangeText={setFechaFin}
        value={fechaFin}
        placeholder="Fecha fin"
      />
      <Button
        title="Generar reporte"
        onPress={getReporte}
      />
      {data && 
  <View>
    <Text>Total Vendido: {data.totalVendido}</Text>
    <Text>Total Invertido: {data.totalInvertido}</Text>
    <Text>Ganancia: {data.ganancia}</Text>
  </View>
}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});