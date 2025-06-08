import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const API_URL = 'http://192.168.20.67:3000';

export default function PetDetailScreen() {
  const route = useRoute();
  const { pet } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${API_URL}/${pet.photo}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{pet.name}</Text>
      <Text style={styles.desc}>{pet.description}</Text>
      <Text style={styles.status}>
        {pet.emPerigo ? '⚠️ Está em perigo!' : '✅ Não parece em perigo'}
      </Text>
      <Text style={styles.coords}>
        📍 Localização:
        {'\n'}latitude: {pet.latitude}
        {'\n'}Longitude: {pet.longitude}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, borderRadius: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  desc: { fontSize: 16, marginVertical: 10 },
  status: { fontSize: 16, color: '#ff6f61' },
  coords: { fontSize: 14, color: '#555', marginTop: 15 },
});
