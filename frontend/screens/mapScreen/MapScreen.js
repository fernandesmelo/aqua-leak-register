import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import mapStyles from "./styles";

const API_URL = "http://SEU_BACKEND_URL:3000";

export default function MapScreen() {
  const [leaks, setLeaks] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/leaks`)
      .then((res) => res.json())
      .then(setLeaks);

    setRegion({
      latitude: -23.55052,
      longitude: -46.633308,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }, []);

  if (!region) {
    return (
      <View style={mapStyles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={mapStyles.mapContainer}>
      <MapView style={mapStyles.mapContainer} initialRegion={region}>
        {leaks.map((leak) => (
          <Marker
            key={leak._id}
            coordinate={{
              latitude: leak.latitude,
              longitude: leak.longitude,
            }}
            title={leak.name}
            description={leak.description}
          />
        ))}
      </MapView>
    </View>
  );
}