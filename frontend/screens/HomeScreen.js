import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import { FAB, Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

const API_URL = 'http://192.168.20.67:3000'; 

export default function HomeScreen() {
  const [pets, setPets] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/pets`);
    const data = await res.json();
    setPets(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={[styles.card, { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd' }]}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.description}</Paragraph>
              <Paragraph style={{ color: item.emPerigo ? '#FF5722' : '#4CAF50' }}>
                {item.emPerigo ? "⚠️ Está em perigo!" : "✅ Não parece em perigo"}
              </Paragraph>
            </Card.Content>
            {item.photo && (
              <Card.Cover
                source={{ uri: `${API_URL}/${item.photo}` }}
                style={styles.image}
              />
            )}
            <Card.Actions style={{ justifyContent: 'flex-end', paddingHorizontal: 8 }}>
              <Button
                mode="contained-tonal"
                icon="eye"
                onPress={() => navigation.navigate('Detalhes', { pet: item })}
                compact
                style={{ backgroundColor: '#9381ff' }}
                textColor="#fff"
              >
                Ver Detalhes
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <View style={{ position: 'absolute', bottom: 20, left: 20, alignItems: 'center' }}>
        <FAB
          icon="map"
          style={styles.mapButton}
          onPress={() => navigation.navigate('Mapa')}
        />
        <Text style={{ marginTop: 4, fontSize: 16 }}>Ver Mapa</Text>
      </View>

      <View style={{ position: 'absolute', bottom: 20, right: 20, alignItems: 'center' }}>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('Registrar Animal')}
        />
        <Text style={{ marginTop: 4, fontSize: 16 }}>Registrar</Text>
      </View>
    </View>
  );
}
