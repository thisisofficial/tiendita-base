
export default function MainMenu(){
    const handleClients = () =>{}
    const handleProducts = () =>{}
    return (
        <View style={styles.container}>
          <View style={styles.button}><Button title="Productos" onPress={handleProducts} /></View>
          <View style={styles.button}><Button title="Clientes" onPress={handleClients} /></View>
          <View style={styles.button}><Button title="Ventas" onPress={() => {}} /></View>
          <View style={styles.button}><Button title="Reportes" onPress={() => {}} /></View> 
        </View>
      );
}