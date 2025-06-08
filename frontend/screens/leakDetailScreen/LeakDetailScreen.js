import React from "react";
import { View, Image, Text } from "react-native";
import leakDetailStyles from "./styles";

const API_URL = "http://SEU_BACKEND_URL:3000";

export default function LeakDetailScreen({ route }) {
  const { leak } = route.params;

  return (
    <View style={leakDetailStyles.container}>
      <Image
        source={{ uri: `${API_URL}/${leak.photo}` }}
        style={leakDetailStyles.image}
        resizeMode="cover"
      />
      <Text style={leakDetailStyles.name}>{leak.name}</Text>
      <Text style={leakDetailStyles.desc}>{leak.description}</Text>
      <Text style={leakDetailStyles.status}>
        {leak.emPerigo ? "⚠️ Vazamento grave!" : "✅ Vazamento controlado"}
      </Text>
      <Text style={leakDetailStyles.coords}>
        📍 Localização:
        {"\n"}latitude: {leak.latitude}
        {"\n"}Longitude: {leak.longitude}
      </Text>
    </View>
  );
}