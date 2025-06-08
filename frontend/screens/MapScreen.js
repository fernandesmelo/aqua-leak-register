import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, ActivityIndicator } from "react-native";

const API_URL = "http://26.146.143.87:3000";

export default function MapScreen() {
  const [leaks, setLeaks] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/leaks`);
      const data = await res.json();
      setLeaks(data);

      if (data.length > 0) {
        const avgLat =
          data.reduce((sum, l) => sum + Number(l.latitude), 0) / data.length;
        const avgLng =
          data.reduce((sum, l) => sum + Number(l.longitude), 0) / data.length;

        setRegion({
          latitude: avgLat,
          longitude: avgLng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    };

    fetchData();
  }, []);

  if (!region) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={region}>
        {leaks.map((l) => (
          <Marker
            key={l._id}
            coordinate={{
              latitude: Number(l.latitude),
              longitude: Number(l.longitude),
            }}
            title={l.name}
            description={l.description}
            pinColor={l.emPerigo ? "red" : "green"}
          />
        ))}
      </MapView>
    </View>
  );
}
