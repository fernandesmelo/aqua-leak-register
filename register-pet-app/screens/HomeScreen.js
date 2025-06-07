import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../styles/styles';

const API_URL = 'http://26.146.143.87:3000';

export default function HomeScreen() {
  const [pets, setPets] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/pets`);
    const data = await res.json();
    setPets(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.nome}</Title>
              <Paragraph>{item.descricao}</Paragraph>
            </Card.Content>
            {item.foto && (
              <Card.Cover source={{ uri: `${API_URL}/uploads/${item.foto}` }} style={styles.image} />
            )}
          </Card>
        )}
      />
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Adicionar Pet')} />
      <FAB icon="map" style={styles.mapButton} onPress={() => navigation.navigate('Mapa')} />
    </View>
  );
}