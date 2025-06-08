import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const API_URL = "http://26.146.143.87:3000";

export default function LeakDetailScreen() {
  const route = useRoute();
  const { leak } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${API_URL}/${leak.photo}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{leak.name}</Text>
      <Text style={styles.desc}>{leak.description}</Text>
      <Text style={styles.status}>
        {leak.emPerigo ? "⚠️ Vazamento grave!" : "✅ Vazamento controlado"}
      </Text>
      <Text style={styles.coords}>
        📍 Localização:
        {"\n"}latitude: {leak.latitude}
        {"\n"}Longitude: {leak.longitude}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  image: { width: "100%", height: 300, borderRadius: 10 },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  desc: { fontSize: 16, marginVertical: 10 },
  status: { fontSize: 16, color: "#ff6f61" },
  coords: { fontSize: 14, color: "#555", marginTop: 15 },
});