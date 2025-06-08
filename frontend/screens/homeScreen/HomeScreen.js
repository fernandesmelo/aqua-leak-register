import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Card, FAB } from "react-native-paper";
import homeStyles from "../styles/homeStyles";

const API_URL = "http://SEU_BACKEND_URL:3000";

export default function HomeScreen({ navigation }) {
  const [leaks, setLeaks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/leaks`)
      .then((res) => res.json())
      .then(setLeaks);
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={leaks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            style={homeStyles.card}
            onPress={() => navigation.navigate("Detalhes", { leak: item })}
          >
            <Card.Title title={item.name} />
            <Card.Content>
              <Card.Cover source={{ uri: `${API_URL}/${item.photo}` }} />
            </Card.Content>
            <Card.Actions style={homeStyles.cardActions}>
            </Card.Actions>
          </Card>
        )}
      />
      <View style={homeStyles.fabContainer}>
        <FAB
          icon="plus"
          onPress={() => navigation.navigate("Registrar Vazamento")}
        />
      </View>
    </View>
  );
}
